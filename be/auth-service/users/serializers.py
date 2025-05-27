from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    # Thêm các field optional cho profile data
    date_of_birth = serializers.DateField(required=False)
    gender = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    emergency_contact = serializers.CharField(required=False)
    license_number = serializers.CharField(required=False)
    specialization = serializers.CharField(required=False)
    experience_years = serializers.IntegerField(required=False)
    biography = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'password_confirm', 'first_name', 'last_name', 
                 'user_type', 'date_of_birth', 'gender', 'address', 'phone', 
                 'emergency_contact', 'license_number', 'specialization', 
                 'experience_years', 'biography']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        # Validate required fields based on user_type
        user_type = attrs.get('user_type')
        if user_type == 'doctor':
            if not attrs.get('license_number'):
                raise serializers.ValidationError("License number is required for doctors")
            if not attrs.get('specialization'):
                raise serializers.ValidationError("Specialization is required for doctors")
        
        return attrs

    def create(self, validated_data):
        # Remove profile-specific fields before creating user
        profile_fields = ['date_of_birth', 'gender', 'address', 'phone', 
                         'emergency_contact', 'license_number', 'specialization', 
                         'experience_years', 'biography']
        
        for field in profile_fields:
            validated_data.pop(field, None)
            
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            user_type=validated_data['user_type']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if user and user.is_active:
            data['user'] = user
            return data
        raise serializers.ValidationError("Invalid credentials")
    
class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for changing user password.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate(self, data):
        user = self.context['request'].user
        if not user.check_password(data['old_password']):
            raise serializers.ValidationError("Old password is incorrect")
        return data

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()