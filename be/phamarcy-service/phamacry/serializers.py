from rest_framework import serializers
from .models import Medication, Inventory, Prescription
import requests

class MedicationSerializer(serializers.ModelSerializer):
    in_stock = serializers.SerializerMethodField()
    
    class Meta:
        model = Medication
        fields = '__all__'
    
    def get_in_stock(self, obj):
        try:
            return obj.inventory.quantity > 0
        except:
            return False

class InventorySerializer(serializers.ModelSerializer):
    medication = MedicationSerializer(read_only=True)
    
    class Meta:
        model = Inventory
        fields = '__all__'

class PrescriptionSerializer(serializers.ModelSerializer):
    patient_info = serializers.SerializerMethodField()
    doctor_info = serializers.SerializerMethodField()
    medication_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Prescription
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
    
    def get_medication_details(self, obj):
        if obj.medications:
            details = []
            for med in obj.medications:
                try:
                    medication = Medication.objects.get(id=med['medication_id'])
                    details.append({
                        'name': medication.name,
                        'quantity': med['quantity'],
                        'instructions': med.get('instructions', ''),
                        'price': float(medication.price)
                    })
                except Medication.DoesNotExist:
                    continue
            return details
        return []