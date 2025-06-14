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
        # Lấy thông tin user từ token
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return Response({"detail": "Authentication required."}, status=401)
        
        try:
            resp = requests.get('http://auth-service:5001/api/auth/user/', 
                              headers={'Authorization': auth_header})
            if resp.status_code == 200:
                user_info = resp.json()
                # Lấy patient_id từ patient service
                patient_resp = requests.get(f'http://patient-service:5002/api/patients/', 
                                          params={'user_id': user_info['id']})
                if patient_resp.status_code == 200:
                    patients = patient_resp.json()
                    if patients:
                        patient_id = patients[0]['id']
                        queryset = self.get_queryset().filter(patient_id=patient_id)
                        
                        # Filter by status if provided
                        status_filter = request.query_params.get('status')
                        if status_filter:
                            queryset = queryset.filter(status=status_filter)
                        
                        serializer = self.get_serializer(queryset, many=True)
                        return Response(serializer.data)
        except Exception:
            pass
        
        return Response([], status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        """Thanh toán hóa đơn"""
        bill = self.get_object()
        payment_method = request.data.get('payment_method')
        amount = request.data.get('amount', bill.total_amount)
        
        if bill.status == 'paid':
            return Response({'error': 'Bill already paid'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Tạo payment record
        payment = Payment.objects.create(
            bill=bill,
            amount=amount,
            payment_method=payment_method,
            transaction_id=f"TXN-{timezone.now().strftime('%Y%m%d%H%M%S')}-{bill.id}",
            status='completed'
        )
        
        # Cập nhật trạng thái bill
        bill.status = 'paid'
        bill.paid_date = timezone.now()
        bill.payment_method = payment_method
        bill.save()
        
        return Response({
            'bill': BillSerializer(bill).data,
            'payment': PaymentSerializer(payment).data,
            'message': 'Payment successful'
        })
    
    @action(detail=False, methods=['post'])
    def create_appointment_bill(self, request):
        """Tạo hóa đơn từ appointment"""
        appointment_id = request.data.get('appointment_id')
        patient_id = request.data.get('patient_id')
        consultation_fee = request.data.get('consultation_fee', 500000)
        
        bill_number = f"BILL-{timezone.now().strftime('%Y%m%d%H%M%S')}"
        
        bill = Bill.objects.create(
            patient_id=patient_id,
            appointment_id=appointment_id,
            bill_number=bill_number,
            items=[{
                'description': 'Consultation Fee',
                'amount': consultation_fee,
                'quantity': 1
            }],
            subtotal=consultation_fee,
            total_amount=consultation_fee,
            due_date=timezone.now() + timezone.timedelta(days=30)
        )
        
        serializer = self.get_serializer(bill)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Thống kê billing"""
        from django.db.models import Sum, Count
        
        stats = {
            'total_bills': Bill.objects.count(),
            'pending_bills': Bill.objects.filter(status='pending').count(),
            'paid_bills': Bill.objects.filter(status='paid').count(),
            'total_revenue': Bill.objects.filter(status='paid').aggregate(
                total=Sum('total_amount'))['total'] or 0,
            'pending_amount': Bill.objects.filter(status='pending').aggregate(
                total=Sum('total_amount'))['total'] or 0,
        }
        
        return Response(stats)

class InsuranceClaimViewSet(viewsets.ModelViewSet):
    queryset = InsuranceClaim.objects.all()
    serializer_class = InsuranceClaimSerializer

    
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

