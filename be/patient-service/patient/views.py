from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Patient, RegularPatient, VIPPatient, MedicalRecord
from .serializers import (
    PatientSerializer, RegularPatientSerializer, 
    VIPPatientSerializer, MedicalRecordSerializer
)
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

    def get_serializer_class(self):
        """Return appropriate serializer based on patient type"""
        if self.action in ['create', 'update', 'partial_update']:
            patient_type = self.request.data.get('patient_type', 'regular')
            if patient_type == 'vip':
                return VIPPatientSerializer
            return RegularPatientSerializer
        return PatientSerializer

    def get_queryset(self):
        """Filter queryset based on patient type if specified"""
        queryset = Patient.objects.all()
        patient_type = self.request.query_params.get('patient_type', None)
        if patient_type:
            queryset = queryset.filter(patient_type=patient_type)
        return queryset

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
            
            # Use appropriate serializer based on patient type
            if patient.patient_type == 'vip':
                try:
                    vip_patient = VIPPatient.objects.get(user_id=user_id)
                    if request.method == 'GET':
                        serializer = VIPPatientSerializer(vip_patient)
                        return Response(serializer.data)
                    elif request.method == 'PUT':
                        serializer = VIPPatientSerializer(vip_patient, data=request.data, partial=True)
                        if serializer.is_valid():
                            serializer.save()
                            return Response(serializer.data)
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                except VIPPatient.DoesNotExist:
                    pass
            else:
                try:
                    regular_patient = RegularPatient.objects.get(user_id=user_id)
                    if request.method == 'GET':
                        serializer = RegularPatientSerializer(regular_patient)
                        return Response(serializer.data)
                    elif request.method == 'PUT':
                        serializer = RegularPatientSerializer(regular_patient, data=request.data, partial=True)
                        if serializer.is_valid():
                            serializer.save()
                            return Response(serializer.data)
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                except RegularPatient.DoesNotExist:
                    pass
            
            # Fallback to base Patient
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

    @action(detail=False, methods=['post'])
    def upgrade_to_vip(self, request):
        """Upgrade regular patient to VIP"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
        
        try:
            patient = Patient.objects.get(user_id=user_id)
            if patient.patient_type == 'vip':
                return Response({'error': 'Patient is already VIP'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create VIP patient instance
            vip_data = {
                'user_id': patient.user_id,
                'date_of_birth': patient.date_of_birth,
                'gender': patient.gender,
                'address': patient.address,
                'phone': patient.phone,
                'medical_history': patient.medical_history,
                'emergency_contact': patient.emergency_contact,
                'first_name': patient.first_name,
                'last_name': patient.last_name,
                'email': patient.email,
                'vip_tier': request.data.get('vip_tier', 'gold'),
                'annual_fee_paid': request.data.get('annual_fee_paid', 0),
            }
            
            # Delete old patient and create VIP patient
            patient.delete()
            vip_patient = VIPPatient.objects.create(**vip_data)
            
            serializer = VIPPatientSerializer(vip_patient)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Patient.DoesNotExist:
            return Response({'error': 'Patient profile not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def vip_benefits(self, request):
        """Get VIP benefits information"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
            
        try:
            patient = Patient.objects.get(user_id=user_id)
            if patient.patient_type != 'vip':
                return Response({'error': 'Patient is not VIP'}, status=status.HTTP_400_BAD_REQUEST)
            
            vip_patient = VIPPatient.objects.get(user_id=user_id)
            benefits_data = {
                'tier': vip_patient.vip_tier,
                'benefits': vip_patient.get_benefits(),
                'discount_rate': float(vip_patient.get_discount_rate() * 100),
                'priority_level': vip_patient.get_priority_level(),
                'membership_active': vip_patient.is_membership_active(),
                'personal_doctor_id': vip_patient.personal_doctor_id,
                'concierge_contact': vip_patient.concierge_contact,
            }
            return Response(benefits_data)
            
        except (Patient.DoesNotExist, VIPPatient.DoesNotExist):
            return Response({'error': 'VIP patient not found'}, status=status.HTTP_404_NOT_FOUND)

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

    @action(detail=False, methods=['get'])
    def lab_results(self, request):
        """Lấy kết quả xét nghiệm của bệnh nhân"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            patient = Patient.objects.get(user_id=user_id)
            resp = requests.get(f'http://laboratory-service:5005/api/tests/?patient_id={patient.id}')
            if resp.status_code == 200:
                return Response(resp.json())
        except Exception:
            pass
        return Response([], status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def add_medical_record(self, request):
        """Thêm hồ sơ bệnh án mới"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            patient = Patient.objects.get(user_id=user_id)
            record_data = request.data.copy()
            record_data['patient'] = patient.id
            serializer = MedicalRecordSerializer(data=record_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def dashboard_data(self, request):
        """Lấy dữ liệu tổng hợp cho dashboard bệnh nhân"""
        user_id, error = self._get_user_id(request)
        if error:
            return error
        try:
            patient = Patient.objects.get(user_id=user_id)
            
            # Thu thập dữ liệu từ các services
            dashboard_data = {
                'patient_info': PatientSerializer(patient).data,
                'total_appointments': 0,
                'upcoming_appointments': [],
                'recent_prescriptions': [],
                'pending_bills': [],
                'recent_lab_results': []
            }
            
            # Lấy appointments
            try:
                resp = requests.get(f'http://appointment-service:5004/api/appointments/?patient_id={patient.id}&limit=5')
                if resp.status_code == 200:
                    appointments = resp.json()
                    dashboard_data['total_appointments'] = len(appointments)
                    dashboard_data['upcoming_appointments'] = [
                        apt for apt in appointments if apt['status'] in ['pending', 'confirmed']
                    ][:3]
            except Exception:
                pass
            
            # Lấy prescriptions
            try:
                resp = requests.get(f'http://phamarcy-service:5006/api/prescriptions/?patient_id={patient.id}&limit=3')
                if resp.status_code == 200:
                    dashboard_data['recent_prescriptions'] = resp.json()
            except Exception:
                pass
            
            # Lấy bills
            try:
                resp = requests.get(f'http://billing-service:5007/api/bills/?patient_id={patient.id}&status=pending')
                if resp.status_code == 200:
                    dashboard_data['pending_bills'] = resp.json()
            except Exception:
                pass
            
            return Response(dashboard_data)            
        except (Patient.DoesNotExist, VIPPatient.DoesNotExist):
            return Response({'error': 'VIP patient not found'}, status=status.HTTP_404_NOT_FOUND)

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
            
            # Determine patient type
            patient_type = request.data.get('patient_type', 'regular')
            
            if patient_type == 'vip':
                # Create VIP patient
                serializer = VIPPatientSerializer(data=request.data)
                if serializer.is_valid():
                    vip_patient = serializer.save()
                    return Response(VIPPatientSerializer(vip_patient).data, status=status.HTTP_201_CREATED)
            else:
                # Create Regular patient
                serializer = RegularPatientSerializer(data=request.data)
                if serializer.is_valid():
                    regular_patient = serializer.save()
                    return Response(RegularPatientSerializer(regular_patient).data, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response(
                {'error': f'Failed to create patient profile: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class VIPPatientViewSet(viewsets.ModelViewSet):
    """ViewSet cho VIP Patients với các tính năng đặc biệt"""
    queryset = VIPPatient.objects.all()
    serializer_class = VIPPatientSerializer
    
    @action(detail=True, methods=['post'])
    def use_free_consultation(self, request, pk=None):
        """Sử dụng lượt khám miễn phí"""
        vip_patient = self.get_object()
        if vip_patient.use_free_consultation():
            return Response({
                'message': 'Free consultation used successfully',
                'remaining_consultations': vip_patient.free_consultations_remaining
            })
        return Response(
            {'error': 'No free consultations remaining'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=True, methods=['get'])
    def calculate_fee(self, request, pk=None):
        """Tính phí khám với discount VIP"""
        vip_patient = self.get_object()
        base_fee = float(request.query_params.get('base_fee', 500000))
        discounted_fee = vip_patient.get_consultation_fee_with_discount(base_fee)
        
        return Response({
            'base_fee': base_fee,
            'discounted_fee': discounted_fee,
            'discount_percentage': vip_patient.discount_percentage,
            'free_consultations_remaining': vip_patient.free_consultations_remaining
        })
    
    @action(detail=False, methods=['get'])
    def membership_stats(self, request):
        """Thống kê membership"""
        stats = {
            'total_vip_patients': VIPPatient.objects.count(),
            'gold_members': VIPPatient.objects.filter(membership_level='gold').count(),
            'platinum_members': VIPPatient.objects.filter(membership_level='platinum').count(),
            'diamond_members': VIPPatient.objects.filter(membership_level='diamond').count(),
        }
        return Response(stats)


class RegularPatientViewSet(viewsets.ModelViewSet):
    """ViewSet cho Regular Patients"""
    queryset = RegularPatient.objects.all()
    serializer_class = RegularPatientSerializer
    
    @action(detail=True, methods=['post'])
    def add_loyalty_points(self, request, pk=None):
        """Thêm điểm thưởng"""
        regular_patient = self.get_object()
        points = request.data.get('points', 0)
        
        if points > 0:
            regular_patient.add_loyalty_points(points)
            return Response({
                'message': f'{points} loyalty points added',
                'total_points': regular_patient.loyalty_points
            })
        return Response(
            {'error': 'Points must be greater than 0'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=True, methods=['post'])
    def use_loyalty_points(self, request, pk=None):
        """Sử dụng điểm thưởng"""
        regular_patient = self.get_object()
        points = request.data.get('points', 0)
        
        if regular_patient.use_loyalty_points(points):
            return Response({
                'message': f'{points} loyalty points used',
                'remaining_points': regular_patient.loyalty_points
            })
        return Response(
            {'error': 'Insufficient loyalty points'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=True, methods=['post'])
    def record_visit(self, request, pk=None):
        """Ghi nhận lượt khám"""
        regular_patient = self.get_object()
        regular_patient.increment_visit_count()
        
        # Thêm loyalty points cho mỗi lượt khám
        regular_patient.add_loyalty_points(10)
        
        return Response({
            'message': 'Visit recorded successfully',
            'total_visits': regular_patient.total_visits,
            'loyalty_points_added': 10,
            'total_loyalty_points': regular_patient.loyalty_points
        })
    
    @action(detail=True, methods=['get'])
    def loyalty_info(self, request, pk=None):
        """Thông tin loyalty"""
        regular_patient = self.get_object()
        
        return Response({
            'loyalty_points': regular_patient.loyalty_points,
            'total_visits': regular_patient.total_visits,
            'loyalty_discount': regular_patient.get_loyalty_discount(),
            'insurance_active': regular_patient.is_insurance_active
        })
