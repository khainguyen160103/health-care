from rest_framework import serializers
from .models import Appointment
import requests

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_info = serializers.SerializerMethodField()
    patient_info = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = '__all__'
        # hoặc: fields = ['id', 'patient_id', 'doctor_id', 'scheduled_time', 'status', 'note', 'created_at', 'doctor_info', 'patient_info']

    def get_doctor_info(self, obj):
        try:
            resp = requests.get(f'http://doctor-service/api/doctors/{obj.doctor_id}/')
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None

    def get_patient_info(self, obj):
        try:
            resp = requests.get(f'http://patient-service/api/patients/{obj.patient_id}/')
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None
