from rest_framework import serializers
from .models import Appointment, AppointmentHistory
import requests
from django.utils import timezone
from datetime import datetime

class DoctorInfoSerializer(serializers.Serializer):
    """Serializer for doctor info from doctor service"""
    id = serializers.IntegerField()
    name = serializers.CharField()
    specialty = serializers.CharField()
    qualification = serializers.CharField()
    experience = serializers.IntegerField()
    rating = serializers.FloatField()
    consultationFee = serializers.DecimalField(max_digits=10, decimal_places=2)
    phone = serializers.CharField()
    biography = serializers.CharField()

class PatientInfoSerializer(serializers.Serializer):
    """Serializer for patient info from patient service"""
    id = serializers.IntegerField()
    name = serializers.CharField()
    phone = serializers.CharField()
    email = serializers.CharField()
    age = serializers.IntegerField(allow_null=True)

class AppointmentSerializer(serializers.ModelSerializer):
    # Additional fields for frontend display
    patient_info = serializers.SerializerMethodField()
    doctor_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time',
            'duration', 'status', 'priority', 'reason', 'symptoms', 'note',
            'consultation_fee', 'created_at', 'booked_by',
             'patient_info', 'doctor_info'
        ]
        read_only_fields = ['id', 'created_at', 'booked_by']

    # def get_scheduled_time(self, obj):
    #     """Format scheduled time for frontend"""
    #     return obj.scheduled_time.isoformat()

    def get_patient_info(self, obj):
        """Get patient info from patient service"""
        try:
            response = requests.get(
                f'http://patient-service:5002/api/patients/{obj.patient_id}/', 
                timeout=5
            )
            if response.status_code == 200:
                patient_data = response.json()
                return {
                    'id': patient_data.get('id'),
                    'name': f"{patient_data.get('first_name', '')} {patient_data.get('last_name', '')}".strip(),
                    'phone': patient_data.get('phone', ''),
                    'email': patient_data.get('email', ''),
                    'age': self._calculate_age(patient_data.get('date_of_birth'))
                }
        except Exception as e:
            print(f"Error fetching patient info: {e}")
        return {'name': 'Unknown Patient', 'phone': '', 'email': ''}

    def get_doctor_info(self, obj):
        """Get doctor info from doctor service"""
        try:
            response = requests.get(
                f'http://doctor-service:5003/api/doctors/{obj.doctor_id}/', 
                timeout=5
            )
            if response.status_code == 200:
                doctor_data = response.json()
                return {
                    'id': doctor_data.get('id'),
                    'name': f"BS. {doctor_data.get('first_name', '')} {doctor_data.get('last_name', '')}".strip(),
                    'specialty': doctor_data.get('specialization', ''),
                    'qualification': doctor_data.get('qualification', ''),
                    'experience': doctor_data.get('experience_years', 0),
                    'rating': 4.8,  # Mock rating for now
                    'consultationFee': float(doctor_data.get('consultation_fee', 500000)),
                    'phone': doctor_data.get('phone', ''),
                    'biography': doctor_data.get('bio', '')
                }
        except Exception as e:
            print(f"Error fetching doctor info: {e}")
        return {'name': 'Unknown Doctor', 'specialty': ''}

    def _calculate_age(self, date_of_birth):
        """Calculate age from date of birth"""
        if not date_of_birth:
            return None
        try:
            from datetime import datetime
            birth_date = datetime.strptime(str(date_of_birth), '%Y-%m-%d').date()
            today = timezone.now().date()
            return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        except:
            return None

class BookAppointmentSerializer(serializers.ModelSerializer):
    """Serializer for booking appointment from frontend"""
    
    class Meta:
        model = Appointment
        fields = [
            'doctor_id', 'appointment_date', 'appointment_time',
            'reason', 'symptoms', 'priority'
        ]

    def validate(self, data):
        """Validate appointment data"""
        appointment_date = data.get('appointment_date')
        appointment_time = data.get('appointment_time')
        doctor_id = data.get('doctor_id')

        # Make appointment_datetime timezone-aware
        appointment_datetime = timezone.make_aware(
            datetime.combine(appointment_date, appointment_time),
            timezone.get_current_timezone()
        )

        if appointment_datetime <= timezone.now():
            raise serializers.ValidationError("Lịch hẹn phải được đặt trong tương lai")
        
        # Check doctor availability
        existing_appointment = Appointment.objects.filter(
            doctor_id=doctor_id,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            status__in=['pending', 'confirmed']
        )
            
        if existing_appointment.exists():
            raise serializers.ValidationError("Bác sĩ không có sẵn vào thời gian này")
            
        return data

class TimeSlotSerializer(serializers.Serializer):
    """Serializer for available time slots"""
    time = serializers.CharField()
    available = serializers.BooleanField()

class SpecialtySerializer(serializers.Serializer):
    """Serializer for specialties"""
    name = serializers.CharField()
    description = serializers.CharField()
    doctor_count = serializers.IntegerField()
