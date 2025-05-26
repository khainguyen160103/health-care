from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Appointment
from .serializers import AppointmentSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    @action(detail=False, methods=['get'])
    def by_patient(self, request):
        patient_id = request.query_params.get('patient_id')
        if not patient_id:
            return Response({'error': 'patient_id is required'}, status=400)
        appointments = Appointment.objects.filter(patient_id=patient_id)
        serializer = self.get_serializer(appointments, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_doctor(self, request):
        doctor_id = request.query_params.get('doctor_id')
        if not doctor_id:
            return Response({'error': 'doctor_id is required'}, status=400)
        appointments = Appointment.objects.filter(doctor_id=doctor_id)
        serializer = self.get_serializer(appointments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        appointment = self.get_object()
        appointment.status = 'confirmed'
        appointment.save()
        return Response({'status': 'confirmed'})

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        appointment = self.get_object()
        appointment.status = 'cancelled'
        appointment.save()
        return Response({'status': 'cancelled'})
