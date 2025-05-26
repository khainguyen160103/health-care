from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Patient, MedicalRecord
from .serializers import PatientSerializer, MedicalRecordSerializer
import requests

# Create your views here.

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get', 'put'])
    def profile(self, request):
        """Lấy/cập nhật hồ sơ bệnh nhân"""
        try:
            patient = Patient.objects.get(user_id=request.user.id)
            if request.method == 'GET':
                serializer = self.get_serializer(patient)
                return Response(serializer.data)
            elif request.method == 'PUT':
                serializer = self.get_serializer(patient, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient profile not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def appointments(self, request):
        """Lấy lịch hẹn của bệnh nhân"""
        try:
            patient = Patient.objects.get(user_id=request.user.id)
            resp = requests.get(f'http://appointment-service:5004/api/appointments/?patient_id={patient.id}')
            if resp.status_code == 200:
                return Response(resp.json())
        except Exception as e:
            pass
        return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def medical_records(self, request):
        """Lấy hồ sơ y tế của bệnh nhân"""
        try:
            patient = Patient.objects.get(user_id=request.user.id)
            records = MedicalRecord.objects.filter(patient=patient)
            serializer = MedicalRecordSerializer(records, many=True)
            return Response(serializer.data)
        except Patient.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def prescriptions(self, request):
        """Lấy đơn thuốc của bệnh nhân"""
        try:
            patient = Patient.objects.get(user_id=request.user.id)
            resp = requests.get(f'http://phamarcy-service:5005/api/prescriptions/?patient_id={patient.id}')
            if resp.status_code == 200:
                return Response(resp.json())
        except Exception:
            pass
        return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def billing(self, request):
        """Lấy hóa đơn của bệnh nhân"""
        try:
            patient = Patient.objects.get(user_id=request.user.id)
            resp = requests.get(f'http://billing-service:5007/api/bills/?patient_id={patient.id}')
            if resp.status_code == 200:
                return Response(resp.json())
        except Exception:
            pass
        return Response([], status=status.HTTP_200_OK)
