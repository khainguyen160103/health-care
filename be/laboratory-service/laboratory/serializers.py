from rest_framework import serializers
from .models import LabTest, LabTestTemplate
import requests

class LabTestSerializer(serializers.ModelSerializer):
    patient_info = serializers.SerializerMethodField()
    doctor_info = serializers.SerializerMethodField()
    
    class Meta:
        model = LabTest
        fields = '__all__'
    
    def get_patient_info(self, obj):
        try:
            resp = requests.get(f'http://patient-service:5002/api/patients/{obj.patient_id}/')
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None
    
    def get_doctor_info(self, obj):
        try:
            resp = requests.get(f'http://doctor-service:5003/api/doctors/{obj.doctor_id}/')
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None

class LabTestTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTestTemplate
        fields = '__all__'
