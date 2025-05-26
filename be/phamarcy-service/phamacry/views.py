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
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Medication.objects.all()
        search = self.request.query_params.get('search', None)
        
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
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
            return Response({'error': 'Prescription already processed'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Kiểm tra tồn kho
        for med in prescription.medications:
            try:
                inventory = Inventory.objects.get(medication_id=med['medication_id'])
                if inventory.quantity < med['quantity']:
                    return Response({'error': f'Insufficient stock for medication ID {med["medication_id"]}'}, status=status.HTTP_400_BAD_REQUEST)
            except Inventory.DoesNotExist:
                return Response({'error': f'Medication ID {med["medication_id"]} not found in inventory'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Cập nhật tồn kho
        for med in prescription.medications:
            inventory = Inventory.objects.get(medication_id=med['medication_id'])
            inventory.quantity -= med['quantity']
            inventory.save()
        
        prescription.status = 'dispensed'
        prescription.dispensed_date = timezone.now()
        prescription.save()
        
        serializer = self.get_serializer(prescription)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Lấy danh sách đơn thuốc chờ cấp phát"""
        prescriptions = Prescription.objects.filter(status='pending')
        serializer = self.get_serializer(prescriptions, many=True)
        return Response(serializer.data)

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [permissions.IsAuthenticated]

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
        threshold = int(request.query_params.get('threshold', 10))
        low_stock = Inventory.objects.filter(quantity__lte=threshold)
        serializer = self.get_serializer(low_stock, many=True)
        return Response(serializer.data)
