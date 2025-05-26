from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LabTest, LabTestTemplate
from .serializers import LabTestSerializer, LabTestTemplateSerializer
from django.utils import timezone
import uuid

class LabTestViewSet(viewsets.ModelViewSet):
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = LabTest.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        status_filter = self.request.query_params.get('status', None)
        date_filter = self.request.query_params.get('date', None)
        urgent = self.request.query_params.get('urgent', None)
        
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if date_filter:
            queryset = queryset.filter(ordered_date__date=date_filter)
        if urgent:
            queryset = queryset.filter(urgent=True)
        
        return queryset
    
    def perform_create(self, serializer):
        # Tự động tạo test code
        test_code = f"LAB-{timezone.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        serializer.save(test_code=test_code)

    @action(detail=True, methods=['post'])
    def collect_sample(self, request, pk=None):
        """Thu thập mẫu xét nghiệm"""
        lab_test = self.get_object()
        if lab_test.status != 'pending':
            return Response({'error': 'Test is not in pending status'}, status=status.HTTP_400_BAD_REQUEST)
        
        lab_test.status = 'sample_collected'
        lab_test.sample_collected_date = timezone.now()
        lab_test.save()
        
        serializer = self.get_serializer(lab_test)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def start_processing(self, request, pk=None):
        """Bắt đầu xử lý mẫu"""
        lab_test = self.get_object()
        if lab_test.status != 'sample_collected':
            return Response({'error': 'Sample not collected yet'}, status=status.HTTP_400_BAD_REQUEST)
        
        lab_test.status = 'in_progress'
        lab_test.save()
        
        serializer = self.get_serializer(lab_test)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def update_results(self, request, pk=None):
        """Cập nhật kết quả xét nghiệm"""
        lab_test = self.get_object()
        results = request.data.get('results')
        technician_notes = request.data.get('technician_notes', '')
        
        if not results:
            return Response({'error': 'Results are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        lab_test.results = results
        lab_test.technician_notes = technician_notes
        lab_test.status = 'completed'
        lab_test.completed_date = timezone.now()
        lab_test.save()
        
        serializer = self.get_serializer(lab_test)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def pending_tests(self, request):
        """Lấy danh sách xét nghiệm chờ xử lý"""
        tests = LabTest.objects.filter(status__in=['pending', 'sample_collected', 'in_progress'])
        serializer = self.get_serializer(tests, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def urgent_tests(self, request):
        """Lấy danh sách xét nghiệm cấp cứu"""
        tests = LabTest.objects.filter(urgent=True, status__in=['pending', 'sample_collected', 'in_progress'])
        serializer = self.get_serializer(tests, many=True)
        return Response(serializer.data)

class LabTestTemplateViewSet(viewsets.ModelViewSet):
    queryset = LabTestTemplate.objects.all()
    serializer_class = LabTestTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]
