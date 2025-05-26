from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Bill, InsuranceClaim, Payment
from .serializers import BillSerializer, InsuranceClaimSerializer, PaymentSerializer
from django.utils import timezone
import uuid
import requests

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Bill.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        status_filter = self.request.query_params.get('status', None)
        
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-created_date')

    def perform_create(self, serializer):
        # Tự động tạo bill number
        bill_number = f"BILL-{timezone.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        
        # Tính toán total amount
        items = serializer.validated_data.get('items', [])
        subtotal = sum(item['amount'] * item.get('quantity', 1) for item in items)
        discount = serializer.validated_data.get('discount', 0)
        tax = serializer.validated_data.get('tax', 0)
        total_amount = subtotal - discount + tax
        
        serializer.save(
            bill_number=bill_number,
            subtotal=subtotal,
            total_amount=total_amount
        )

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        """Thanh toán hóa đơn"""
        bill = self.get_object()
        payment_method = request.data.get('payment_method')
        amount = request.data.get('amount', bill.total_amount)
        
        if bill.status not in ['pending', 'overdue']:
            return Response({'error': 'Bill is not payable'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not payment_method:
            return Response({'error': 'Payment method is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Tạo payment record
        transaction_id = f"TXN-{timezone.now().strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:6].upper()}"
        payment = Payment.objects.create(
            bill=bill,
            amount=amount,
            payment_method=payment_method,
            transaction_id=transaction_id,
            status='completed'
        )
        
        # Cập nhật bill status
        bill.status = 'paid'
        bill.payment_method = payment_method
        bill.paid_date = timezone.now()
        bill.save()
        
        serializer = self.get_serializer(bill)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_bills(self, request):
        """Lấy hóa đơn của bệnh nhân hiện tại"""
        try:
            # Lấy patient info từ request user
            patient_resp = requests.get(
                f'http://patient-service:5002/api/patients/profile/', 
                headers={'Authorization': request.headers.get('Authorization')}
            )
            if patient_resp.status_code == 200:
                patient_data = patient_resp.json()
                bills = Bill.objects.filter(patient_id=patient_data['id'])
                serializer = self.get_serializer(bills, many=True)
                return Response(serializer.data)
        except Exception:
            pass
        
        return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def overdue_bills(self, request):
        """Lấy danh sách hóa đơn quá hạn"""
        overdue_bills = Bill.objects.filter(
            status='pending',
            due_date__lt=timezone.now()
        )
        # Cập nhật status thành overdue
        overdue_bills.update(status='overdue')
        
        bills = Bill.objects.filter(status='overdue')
        serializer = self.get_serializer(bills, many=True)
        return Response(serializer.data)

class InsuranceClaimViewSet(viewsets.ModelViewSet):
    queryset = InsuranceClaim.objects.all()
    serializer_class = InsuranceClaimSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Phê duyệt claim bảo hiểm"""
        claim = self.get_object()
        approved_amount = request.data.get('approved_amount')
        
        if not approved_amount:
            return Response({'error': 'Approved amount is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        claim.status = 'approved'
        claim.approved_amount = approved_amount
        claim.processed_date = timezone.now()
        claim.save()
        
        serializer = self.get_serializer(claim)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Từ chối claim bảo hiểm"""
        claim = self.get_object()
        rejection_reason = request.data.get('rejection_reason')
        
        if not rejection_reason:
            return Response({'error': 'Rejection reason is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        claim.status = 'rejected'
        claim.rejection_reason = rejection_reason
        claim.processed_date = timezone.now()
        claim.save()
        
        serializer = self.get_serializer(claim)
        return Response(serializer.data)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
