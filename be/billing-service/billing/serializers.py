from rest_framework import serializers
from .models import Bill, InsuranceClaim, Payment
import requests

class BillSerializer(serializers.ModelSerializer):
    patient_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Bill
        fields = '__all__'
    
    def get_patient_info(self, obj):
        try:
            resp = requests.get(f'http://patient-service:5002/api/patients/{obj.patient_id}/')
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None

class InsuranceClaimSerializer(serializers.ModelSerializer):
    bill_info = BillSerializer(source='bill', read_only=True)
    
    class Meta:
        model = InsuranceClaim
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
