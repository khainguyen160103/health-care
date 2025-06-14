from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Medication, Inventory, Prescription
from .serializers import MedicationSerializer, InventorySerializer, PrescriptionSerializer
from django.utils import timezone
import uuid

class MedicationViewSet(viewsets.ModelViewSet):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

    
    def get_queryset(self):
        queryset = Medication.objects.all()
        search = self.request.query_params.get('search', None)
        
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer

    
    def get_queryset(self):
        queryset = Prescription.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        status_filter = self.request.query_params.get('status', None)
        
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset
    
    def perform_create(self, serializer):
        # Tự động tạo prescription number
        prescription_number = f"RX-{timezone.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        serializer.save(prescription_number=prescription_number)

    @action(detail=True, methods=['post'])
    def dispense(self, request, pk=None):
        """Cấp phát đơn thuốc"""
        prescription = self.get_object()
        
        if prescription.status != 'pending':
            return Response({'error': 'Prescription already processed'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        # Kiểm tra tồn kho
        medications = prescription.medications
        for med in medications:
            try:
                medication = Medication.objects.get(id=med['medication_id'])
                inventory = medication.inventory
                if inventory.quantity < med['quantity']:
                    return Response({
                        'error': f'Insufficient stock for {medication.name}. Available: {inventory.quantity}, Required: {med["quantity"]}'
                    }, status=status.HTTP_400_BAD_REQUEST)
            except (Medication.DoesNotExist, Inventory.DoesNotExist):
                return Response({'error': f'Medication not found'}, 
                              status=status.HTTP_400_BAD_REQUEST)
        
        # Cập nhật tồn kho và trạng thái
        for med in medications:
            medication = Medication.objects.get(id=med['medication_id'])
            inventory = medication.inventory
            inventory.quantity -= med['quantity']
            inventory.save()
        
        prescription.status = 'dispensed'
        prescription.dispensed_date = timezone.now()
        prescription.save()
        
        serializer = self.get_serializer(prescription)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def pending_prescriptions(self, request):
        """Lấy danh sách đơn thuốc chờ xử lý"""
        queryset = self.get_queryset().filter(status='pending').order_by('-prescribed_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Thống kê dược phẩm"""
        from django.db.models import Count, Sum
        
        stats = {
            'total_prescriptions': Prescription.objects.count(),
            'pending_prescriptions': Prescription.objects.filter(status='pending').count(),
            'dispensed_today': Prescription.objects.filter(
                dispensed_date__date=timezone.now().date()
            ).count(),
            'low_stock_medications': Inventory.objects.filter(quantity__lt=50).count(),
            'total_medications': Medication.objects.count(),
        }
        
        return Response(stats)

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

    @action(detail=True, methods=['put'])
    def update_stock(self, request, pk=None):
        """Cập nhật tồn kho"""
        inventory = self.get_object()
        quantity = request.data.get('quantity')
        
        if quantity is not None:
            inventory.quantity = quantity
            inventory.save()
            serializer = self.get_serializer(inventory)
            return Response(serializer.data)
        
        return Response({'error': 'Quantity is required'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        """Lấy danh sách thuốc sắp hết"""
        threshold = int(request.query_params.get('threshold', 50))
        low_stock_items = self.get_queryset().filter(inventory__quantity__lt=threshold)
        serializer = self.get_serializer(low_stock_items, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_stock(self, request, pk=None):
        """Cập nhật tồn kho thuốc"""
        medication = self.get_object()
        quantity = request.data.get('quantity')
        operation = request.data.get('operation', 'add')  # add or set
        
        if not quantity:
            return Response({'error': 'Quantity is required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        try:
            inventory = medication.inventory
            if operation == 'add':
                inventory.quantity += int(quantity)
            else:  # set
                inventory.quantity = int(quantity)
            inventory.save()
            
            serializer = self.get_serializer(medication)
            return Response(serializer.data)
        except Inventory.DoesNotExist:
            return Response({'error': 'Inventory not found'}, 
                          status=status.HTTP_404_NOT_FOUND)
