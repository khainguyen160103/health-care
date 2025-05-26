from rest_framework import serializers
from .models import Patient, MedicalRecord
import requests

class PatientSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Patient
        fields = '__all__'
    
    def get_user_info(self, obj):
        try:
            resp = requests.get(f'http://auth-service:5001/api/auth/users/{obj.user_id}/')
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None

class MedicalRecordSerializer(serializers.ModelSerializer):
    doctor_info = serializers.SerializerMethodField()
    
    class Meta:
        model = MedicalRecord
        fields = '__all__'
    
    def get_doctor_info(self, obj):
        try:
            resp = requests.get(f'http://doctor-service:5003/api/doctors/{obj.doctor_id}/')
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None
