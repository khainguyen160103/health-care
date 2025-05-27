from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Patient, MedicalRecord
from .serializers import PatientSerializer, MedicalRecordSerializer
import requests

AUTH_SERVICE_URL = "http://auth-service:5001/api/auth/user/"  # endpoint lấy user info từ token

def get_user_info_from_token(token):
    headers = {"Authorization": f"Bearer {token}"}
    try:
        resp = requests.get(AUTH_SERVICE_URL, headers=headers, timeout=5)
        print("DEBUG AUTH-SERVICE RESPONSE:", resp.status_code, resp.text)  # Thêm dòng này để xem response
        if resp.status_code == 200:
            return resp.json()  # Trả về thông tin user
    except Exception as e:
        print("DEBUG AUTH-SERVICE ERROR:", e)  # In lỗi nếu có
    return None

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    # def get_permissions(self):
    #     """Cho phép auth-service tạo patient profile mà không cần authentication"""
    #     if self.action == 'create':
    #         return [AllowAny()]
    #     return [IsAuthenticated()]

    def _get_user_id(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None, Response({"detail": "Authentication credentials were not provided."}, status=401)
        token = auth_header.split(" ")[1]
        user_info = get_user_info_from_token(token)
        if not user_info or user_info.get("user_type") != "patient":
            return None, Response({"detail": "Permission denied or invalid token."}, status=403)
        return user_info["id"], None

    @action(detail=False, methods=['get', 'put'])
    def profile(self, request):
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            patient = Patient.objects.get(user_id=user_id)
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
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            patient = Patient.objects.get(user_id=user_id)
            resp = requests.get(f'http://appointment-service:5004/api/appointments/?patient_id={patient.id}')
            if resp.status_code == 200:
                return Response(resp.json())
        except Exception:
            pass
        return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def medical_records(self, request):
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            patient = Patient.objects.get(user_id=user_id)
            records = MedicalRecord.objects.filter(patient=patient)
            serializer = MedicalRecordSerializer(records, many=True)
            return Response(serializer.data)
        except Patient.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def prescriptions(self, request):
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            patient = Patient.objects.get(user_id=user_id)
            resp = requests.get(f'http://phamarcy-service:5006/api/prescriptions/?patient_id={patient.id}')
            if resp.status_code == 200:
                return Response(resp.json())
        except Exception:
            pass
        return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def billing(self, request):
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            patient = Patient.objects.get(user_id=user_id)
            resp = requests.get(f'http://billing-service:5007/api/bills/?patient_id={patient.id}')
            if resp.status_code == 200:
                return Response(resp.json())
        except Exception:
            pass
        return Response([], status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """Tạo patient profile từ auth-service"""
        try:
            # Kiểm tra xem patient đã tồn tại chưa
            user_id = request.data.get('user_id')
            if Patient.objects.filter(user_id=user_id).exists():
                return Response(
                    {'error': 'Patient profile already exists'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response(
                {'error': f'Failed to create patient profile: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
