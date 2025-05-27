from rest_framework import serializers
from .models import Patient, MedicalRecord
import requests

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        
    def validate_user_id(self, value):
        """Validate user_id format"""
        if not value:
            raise serializers.ValidationError("user_id is required")
        return value

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
