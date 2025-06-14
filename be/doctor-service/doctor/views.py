from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Doctor, Schedule
from .serializers import DoctorSerializer, ScheduleSerializer, DoctorProfileSerializer
import requests
from django.utils import timezone
from rest_framework.permissions import AllowAny

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_permissions(self):
        """Cho phép auth-service tạo doctor profile mà không cần authentication"""
        if self.action == 'create':
            return [AllowAny()]
    
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

    def create(self, request, *args, **kwargs):
        """Tạo doctor profile từ auth-service"""
        try:
            # Kiểm tra xem doctor đã tồn tại chưa
            user_id = request.data.get('user_id')
            if Doctor.objects.filter(user_id=user_id).exists():
                return Response(
                    {'error': 'Doctor profile already exists'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response(
                {'error': f'Failed to create doctor profile: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def _get_user_id(self, request):
        """Helper method để lấy user_id từ token"""
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None, Response({"detail": "Authentication credentials were not provided."}, status=401)
        token = auth_header.split(" ")[1]
        try:
            resp = requests.get('http://auth-service:5001/api/auth/user/', 
                              headers={'Authorization': f'Bearer {token}'})
            if resp.status_code == 200:
                user_info = resp.json()
                if user_info.get("user_type") != "doctor":
                    return None, Response({"detail": "Permission denied. Doctor access required."}, status=403)
                return user_info["id"], None
        except Exception:
            pass
        return None, Response({"detail": "Invalid token."}, status=403)
    
    @action(detail=False, methods=['get'])
    def patients(self, request):
        """Lấy danh sách bệnh nhân của bác sĩ"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            doctor = Doctor.objects.get(user_id=user_id)
            # Lấy danh sách bệnh nhân từ appointments
            resp = requests.get(f'http://appointment-service:5004/api/appointments/?doctor_id={doctor.id}')
            if resp.status_code == 200:
                appointments = resp.json()
                # Lấy unique patient IDs
                patient_ids = list(set([apt['patient_id'] for apt in appointments]))
                patients = []
                for patient_id in patient_ids:
                    try:
                        patient_resp = requests.get(f'http://patient-service:5002/api/patients/{patient_id}/')
                        if patient_resp.status_code == 200:
                            patients.append(patient_resp.json())
                    except Exception:
                        continue
                return Response(patients)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor profile not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response([], status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def prescribe(self, request):
        """Kê đơn thuốc cho bệnh nhân"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            doctor = Doctor.objects.get(user_id=user_id)
            prescription_data = request.data.copy()
            prescription_data['doctor_id'] = doctor.id
            
            # Gửi đơn thuốc tới pharmacy service
            resp = requests.post('http://phamarcy-service:5006/api/prescriptions/', 
                               json=prescription_data)
            if resp.status_code == 201:
                return Response(resp.json(), status=status.HTTP_201_CREATED)
            return Response({'error': 'Failed to create prescription'}, status=status.HTTP_400_BAD_REQUEST)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor profile not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def order_lab_test(self, request):
        """Chỉ định xét nghiệm cho bệnh nhân"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            doctor = Doctor.objects.get(user_id=user_id)
            test_data = request.data.copy()
            test_data['doctor_id'] = doctor.id
            
            # Gửi yêu cầu xét nghiệm tới lab service
            resp = requests.post('http://laboratory-service:5005/api/tests/', 
                               json=test_data)
            if resp.status_code == 201:
                return Response(resp.json(), status=status.HTTP_201_CREATED)
            return Response({'error': 'Failed to order lab test'}, status=status.HTTP_400_BAD_REQUEST)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def dashboard_data(self, request):
        """Lấy dữ liệu tổng hợp cho dashboard bác sĩ"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            doctor = Doctor.objects.get(user_id=user_id)
            
            dashboard_data = {
                'doctor_info': DoctorSerializer(doctor).data,
                'today_appointments': [],
                'upcoming_appointments': [],
                'total_patients': 0,
                'recent_prescriptions': [],
                'pending_lab_results': []
            }
            
            # Lấy appointments của hôm nay
            from datetime import date
            today = date.today()
            try:
                resp = requests.get(f'http://appointment-service:5004/api/appointments/?doctor_id={doctor.id}&date={today}')
                if resp.status_code == 200:
                    dashboard_data['today_appointments'] = resp.json()
            except Exception:
                pass
            
            # Lấy các appointments sắp tới
            try:
                resp = requests.get(f'http://appointment-service:5004/api/appointments/?doctor_id={doctor.id}&status=confirmed&limit=5')
                if resp.status_code == 200:
                    dashboard_data['upcoming_appointments'] = resp.json()
            except Exception:
                pass
            
            return Response(dashboard_data)
            
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor profile not found'}, status=status.HTTP_404_NOT_FOUND)
