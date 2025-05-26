from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Doctor, Schedule
from .serializers import DoctorSerializer, ScheduleSerializer, DoctorProfileSerializer
import requests
from django.utils import timezone

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Doctor.objects.filter(is_active=True)
        specialization = self.request.query_params.get('specialization', None)
        search = self.request.query_params.get('search', None)
        
        if specialization:
            queryset = queryset.filter(specialization__icontains=specialization)
        
        return queryset

    @action(detail=False, methods=['get', 'put'])
    def profile(self, request):
        """Lấy/cập nhật hồ sơ bác sĩ"""
        try:
            doctor = Doctor.objects.get(user_id=request.user.id)
            if request.method == 'GET':
                serializer = DoctorSerializer(doctor)
                return Response(serializer.data)
            elif request.method == 'PUT':
                serializer = DoctorProfileSerializer(doctor, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor profile not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def appointments(self, request):
        """Lấy lịch hẹn của bác sĩ"""
        try:
            doctor = Doctor.objects.get(user_id=request.user.id)
            resp = requests.get(f'http://appointment-service:5004/api/appointments/?doctor_id={doctor.id}')
            if resp.status_code == 200:
                return Response(resp.json())
        except Exception:
            pass
        return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get', 'post'])
    def schedule(self, request):
        """Lấy/tạo lịch trình bác sĩ"""
        try:
            doctor = Doctor.objects.get(user_id=request.user.id)
            if request.method == 'GET':
                date_filter = request.query_params.get('date', None)
                schedules = Schedule.objects.filter(doctor=doctor)
                if date_filter:
                    schedules = schedules.filter(date=date_filter)
                serializer = ScheduleSerializer(schedules, many=True)
                return Response(serializer.data)
            elif request.method == 'POST':
                data = request.data.copy()
                data['doctor'] = doctor.id
                serializer = ScheduleSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor profile not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def specializations(self, request):
        """Lấy danh sách chuyên khoa"""
        specializations = Doctor.objects.values_list('specialization', flat=True).distinct()
        return Response(list(specializations))
