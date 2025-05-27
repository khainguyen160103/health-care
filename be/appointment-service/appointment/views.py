from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, timedelta, time
from .models import Appointment, AppointmentHistory
from .serializers import (
    AppointmentSerializer, BookAppointmentSerializer, 
    TimeSlotSerializer, SpecialtySerializer, DoctorInfoSerializer
)
import requests

AUTH_SERVICE_URL = "http://auth-service:5001/api/auth/user/"

def get_user_info_from_token(token):
    """Get user info from auth service"""
    headers = {"Authorization": f"Bearer {token}"}
    try:
        resp = requests.get(AUTH_SERVICE_URL, headers=headers, timeout=5)
        if resp.status_code == 200:
            return resp.json()
    except Exception as e:
        print("DEBUG AUTH-SERVICE ERROR:", e)
    return None

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def _get_user_info(self, request):
        """Helper method to get user info from token"""
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None, Response({"detail": "Authentication required."}, status=401)
        token = auth_header.split(" ")[1]
        user_info = get_user_info_from_token(token)
        if not user_info:
            return None, Response({"detail": "Invalid token."}, status=403)
        return user_info, None

    @action(detail=False, methods=['get'])
    def specialties(self, request):
        """Get available specialties - dùng cho Bước 1 của BookAppointment"""
        try:
            # Get specialties from doctor service
            response = requests.get(
                'http://doctor-service:5003/api/doctors/specializations/',
                timeout=5
            )
            if response.status_code == 200:
                specialties_data = response.json()
                # Format for frontend
                specialties = []
                for specialty in specialties_data:
                    specialties.append({
                        'name': specialty.get('name', specialty),
                        'description': specialty.get('description', ''),
                        'doctor_count': specialty.get('doctor_count', 0)
                    })
                return Response(specialties)
            else:
                # Fallback to hardcoded specialties matching frontend
                specialties = [
                    {"name": "Tim mạch", "description": "Chuyên khoa tim mạch", "doctor_count": 5},
                    {"name": "Nội khoa", "description": "Chuyên khoa nội tổng quát", "doctor_count": 8},
                    {"name": "Ngoại khoa", "description": "Chuyên khoa phẫu thuật", "doctor_count": 6},
                    {"name": "Sản phụ khoa", "description": "Chuyên khoa phụ sản", "doctor_count": 4},
                    {"name": "Nhi khoa", "description": "Chuyên khoa trẻ em", "doctor_count": 7},
                    {"name": "Da liễu", "description": "Chuyên khoa da và liễu", "doctor_count": 3},
                    {"name": "Mắt", "description": "Chuyên khoa mắt", "doctor_count": 4},
                    {"name": "Tai mũi họng", "description": "Chuyên khoa tai mũi họng", "doctor_count": 5}
                ]
                return Response(specialties)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    @action(detail=False, methods=['get'])
    def doctors_by_specialty(self, request):
        """Get doctors by specialty - dùng cho Bước 2 của BookAppointment"""
        specialty = request.query_params.get('specialty')
        if not specialty:
            return Response({'error': 'Specialty parameter required'}, status=400)

        try:
            # Get doctors from doctor service
            response = requests.get(
                f'http://doctor-service:5003/api/doctors/?specialization={specialty}',
                timeout=5
            )
            if response.status_code == 200:
                doctors_data = response.json()
                # Format for frontend matching the structure in BookAppointment.tsx
                doctors = []
                for doctor in doctors_data:
                    doctors.append({
                        'id': doctor.get('id'),
                        'name': f"BS. {doctor.get('first_name', '')} {doctor.get('last_name', '')}".strip(),
                        'specialty': doctor.get('specialization', specialty),
                        'qualification': doctor.get('qualification', 'Bác sĩ đa khoa'),
                        'experience': doctor.get('experience_years', 0),
                        'rating': 4.8,  # Mock rating
                        'consultationFee': float(doctor.get('consultation_fee', 500000)),
                        'phone': doctor.get('phone', ''),
                        'biography': doctor.get('bio', ''),
                        'available': True  # Assume available for listing
                    })
                return Response(doctors)
            else:
                return Response([], status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        """Get available time slots - dùng cho Bước 3 của BookAppointment"""
        doctor_id = request.query_params.get('doctor_id')
        date = request.query_params.get('date')
        
        if not doctor_id or not date:
            return Response({'error': 'doctor_id and date required'}, status=400)

        try:
            # Parse date
            appointment_date = datetime.strptime(date, '%Y-%m-%d').date()
            
            # Check if date is in the past
            if appointment_date <= timezone.now().date():
                return Response({
                    'date': date,
                    'doctor_id': doctor_id,
                    'available_slots': []
                })
            
            # Generate time slots matching frontend timeSlots
            time_slots = [
                "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
                "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
                "15:00", "15:30", "16:00", "16:30"
            ]
            
            # Get existing appointments for this doctor on this date
            existing_appointments = Appointment.objects.filter(
                doctor_id=doctor_id,
                appointment_date=appointment_date,
                status__in=['pending', 'confirmed']
            ).values_list('appointment_time', flat=True)
            
            # Convert to time strings for comparison
            booked_times = [t.strftime('%H:%M') for t in existing_appointments]
            
            # Build available slots matching frontend structure
            available_slots = []
            for slot in time_slots:
                available_slots.append({
                    'time': slot,
                    'available': slot not in booked_times
                })
            
            return Response({
                'date': date,
                'doctor_id': doctor_id,
                'available_slots': available_slots
            })
                
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    def create(self, request, *args, **kwargs):
        """Book appointment - xử lý từ BookAppointment frontend"""
        user_info, error = self._get_user_info(request)
        if error:
            return error

        try:
            # Get patient ID for the current user
            if user_info['user_type'] == 'patient':
                patient_response = requests.get(
                    f'http://patient-service:5002/api/patients/profile/', 
                    headers={'Authorization': request.headers.get('Authorization')},
                    timeout=5
                )
                if patient_response.status_code == 200:
                    patient_data = patient_response.json()
                    patient_id = patient_data['id']
                else:
                    return Response({'error': 'Patient profile not found'}, status=400)
            else:
                # Admin or staff booking for patient
                patient_id = request.data.get('patient_id')
                if not patient_id:
                    return Response({'error': 'Patient ID required'}, status=400)

            # Get doctor info for consultation fee
            doctor_id = request.data.get('doctor_id')
            doctor_response = requests.get(
                f'http://doctor-service:5003/api/doctors/{doctor_id}/', 
                timeout=5
            )
            consultation_fee = 500000  # Default
            if doctor_response.status_code == 200:
                doctor_data = doctor_response.json()
                consultation_fee = doctor_data.get('consultation_fee', 500000)

            # Prepare appointment data matching frontend fields
            appointment_data = {
                'patient_id': patient_id,
                'doctor_id': doctor_id,
                'appointment_date': request.data.get('appointment_date'),
                'appointment_time': request.data.get('appointment_time'),
                'reason': request.data.get('reason', ''),
                'symptoms': request.data.get('symptoms', ''),  # This maps to appointmentReason from frontend
                'priority': request.data.get('priority', 'normal'),
                'consultation_fee': consultation_fee,
                'booked_by': user_info['id']
            }

        except Exception as e:
            return Response({'error': f'Failed to process booking: {str(e)}'}, status=400)

        # Validate appointment data
        book_serializer = BookAppointmentSerializer(data=appointment_data)
        if book_serializer.is_valid():
            # Create appointment
            appointment = Appointment.objects.create(**appointment_data)
            
            # Create history record
            AppointmentHistory.objects.create(
                appointment=appointment,
                action='created',
                note=f"Lịch hẹn được đặt bởi {user_info['first_name']} {user_info['last_name']}",
                created_by=user_info['id']
            )
            
            # Return full appointment data with patient/doctor info
            serializer = AppointmentSerializer(appointment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(book_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def my_appointments(self, request):
        """Get appointments for current patient - dùng cho Patient Dashboard"""
        user_info, error = self._get_user_info(request)
        if error:
            return error
            
        if user_info['user_type'] != 'patient':
            return Response({'error': 'Only patients can access this endpoint'}, status=403)

        try:
            # Get patient profile
            patient_response = requests.get(
                f'http://patient-service:5002/api/patients/profile/', 
                headers={'Authorization': request.headers.get('Authorization')},
                timeout=5
            )
            if patient_response.status_code == 200:
                patient_data = patient_response.json()
                appointments = Appointment.objects.filter(
                    patient_id=patient_data['id']
                ).order_by('-appointment_date', '-appointment_time')
                
                # Pagination
                page = int(request.query_params.get('page', 1))
                page_size = int(request.query_params.get('page_size', 10))
                start = (page - 1) * page_size
                end = start + page_size
                
                serializer = AppointmentSerializer(appointments[start:end], many=True)
                return Response({
                    'results': serializer.data,
                    'count': appointments.count(),
                    'page': page,
                    'page_size': page_size,
                    'total_pages': (appointments.count() + page_size - 1) // page_size
                })
            else:
                return Response({'error': 'Patient profile not found'}, status=404)
                
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    @action(detail=False, methods=['get'])
    def doctor_appointments(self, request):
        """Get appointments for current doctor - dùng cho Doctor Dashboard"""
        user_info, error = self._get_user_info(request)
        if error:
            return error
            
        if user_info['user_type'] != 'doctor':
            return Response({'error': 'Only doctors can access this endpoint'}, status=403)

        try:
            # Get doctor profile
            doctor_response = requests.get(
                f'http://doctor-service:5003/api/doctors/profile/', 
                headers={'Authorization': request.headers.get('Authorization')},
                timeout=5
            )
            if doctor_response.status_code == 200:
                doctor_data = doctor_response.json()
                
                # Filter by date if provided, default to today
                date_filter = request.query_params.get('date')
                if not date_filter:
                    date_filter = timezone.now().date()
                
                appointments = Appointment.objects.filter(
                    doctor_id=doctor_data['id'],
                    appointment_date=date_filter
                ).order_by('appointment_time')
                
                serializer = AppointmentSerializer(appointments, many=True)
                return Response({'results': serializer.data})
            else:
                return Response({'error': 'Doctor profile not found'}, status=404)
                
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """Confirm appointment (doctor/admin only)"""
        user_info, error = self._get_user_info(request)
        if error:
            return error
            
        if user_info['user_type'] not in ['doctor', 'admin']:
            return Response({'error': 'Permission denied'}, status=403)

        appointment = self.get_object()
        if appointment.status != 'pending':
            return Response({'error': 'Only pending appointments can be confirmed'}, status=400)

        appointment.status = 'confirmed'
        appointment.notes = request.data.get('notes', appointment.notes)
        appointment.save()
        
        # Create history record
        AppointmentHistory.objects.create(
            appointment=appointment,
            action='confirmed',
            note=request.data.get('notes', 'Appointment confirmed'),
            created_by=user_info['id']
        )
        
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel appointment"""
        user_info, error = self._get_user_info(request)
        if error:
            return error

        appointment = self.get_object()
        
        # Check permissions
        if user_info['user_type'] == 'patient':
            # Patient can only cancel their own appointments
            try:
                patient_response = requests.get(
                    f'http://patient-service:5002/api/patients/profile/', 
                    headers={'Authorization': request.headers.get('Authorization')},
                    timeout=5
                )
                if patient_response.status_code == 200:
                    patient_data = patient_response.json()
                    if appointment.patient_id != patient_data['id']:
                        return Response({'error': 'Permission denied'}, status=403)
                else:
                    return Response({'error': 'Patient profile not found'}, status=404)
            except Exception:
                return Response({'error': 'Failed to verify patient'}, status=500)

        if appointment.status in ['cancelled', 'completed']:
            return Response({'error': 'Cannot cancel this appointment'}, status=400)

        appointment.status = 'cancelled'
        appointment.save()
        
        # Create history record
        AppointmentHistory.objects.create(
            appointment=appointment,
            action='cancelled',
            note=request.data.get('reason', 'Appointment cancelled'),
            created_by=user_info['id']
        )
        
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
