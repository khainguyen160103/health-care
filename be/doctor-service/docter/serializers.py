from rest_framework import serializers
from .models import Doctor, Schedule
import requests

class DoctorSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Doctor
        fields = '__all__'
    
    def get_user_info(self, obj):
        try:
            resp = requests.get(f'http://auth-service:5001/api/auth/users/{obj.user_id}/')
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None

class ScheduleSerializer(serializers.ModelSerializer):
    doctor_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Schedule
        fields = '__all__'
    
    def get_doctor_name(self, obj):
        try:
            resp = requests.get(f'http://auth-service:5001/api/auth/users/{obj.doctor.user_id}/')
            if resp.status_code == 200:
                user_data = resp.json()
                return f"{user_data.get('first_name', '')} {user_data.get('last_name', '')}"
        except Exception:
            pass
        return None

class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        exclude = ['user_id']  # Không cho sửa user_id
