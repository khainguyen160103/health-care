from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny , IsAdminUser
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, LoginSerializer, ChangePasswordSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import requests
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def get_permissions(self):
        # Cho phép đăng ký, đăng nhập không cần xác thực, các API khác cần xác thực
        if self.action in ['create', 'login', 'register', 'change_password', 'logout']:
            return [AllowAny()]
        if self.action in ['destroy','list']: 
            return [IsAdminUser()]
        return [IsAuthenticated()]
    
    def create_profile_in_service(self, user, service_url, profile_data):
        """Helper method để tạo profile trong service tương ứng"""
        try:
            response = requests.post(
                service_url,
                json=profile_data,
                timeout=10
            )
            if response.status_code in [200, 201]:
                logger.info(f"Profile created successfully in {service_url} for user {user.id}")
                return True
            else:
                logger.error(f"Failed to create profile in {service_url}: {response.text}")
                return False
        except Exception as e:
            logger.error(f"Error creating profile in {service_url}: {str(e)}")
            return False

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Tạo profile data cơ bản
            profile_data = {
                'user_id': str(user.id),
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
            }
            
            # Tạo profile trong service tương ứng dựa trên user_type
            if user.user_type == 'patient':
                # Thêm thông tin specific cho patient
                patient_data = {
                    **profile_data,
                    'date_of_birth': request.data.get('date_of_birth'),
                    'gender': request.data.get('gender', 'Other'),
                    'address': request.data.get('address', ''),
                    'phone': request.data.get('phone', ''),
                    'emergency_contact': request.data.get('emergency_contact', ''),
                }
                self.create_profile_in_service(
                    user, 
                    'http://patient-service:5002/api/patients/', 
                    patient_data
                )
                
            elif user.user_type == 'doctor':
                # Thêm thông tin specific cho doctor
                doctor_data = {
                    **profile_data,
                    'license_number': request.data.get('license_number'),
                    'specialization': request.data.get('specialization'),
                    'experience_years': request.data.get('experience_years', 0),
                    'phone': request.data.get('phone', ''),
                    'biography': request.data.get('biography', ''),
                }
                self.create_profile_in_service(
                    user, 
                    'http://doctor-service:5003/api/doctors/', 
                    doctor_data
                )
                
            elif user.user_type == 'pharmacy':
                # Có thể thêm pharmacy staff profile nếu cần
                pass
                
            elif user.user_type == 'lab':
                # Có thể thêm lab staff profile nếu cần
                pass
            
            self.send_welcome_email(user)
            return Response({
                "detail": "Đăng ký thành công!",
                "user_id": str(user.id),
                "user_type": user.user_type
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": str(user.id),
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "user_type": user.user_type,
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def change_password(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                  
    def send_welcome_email(self, user):
        try:
            notification_url = 'http://notification-service:5008/api/notifications/send-email/'
            email_data = {
                'recipient_email': user.email,
                'subject': 'Chào mừng bạn',
                "body": f"Chào {user.first_name},\n\nCảm ơn bạn đã đăng ký tài khoản với chúng tôi."
            }
            
            logger.info(f'Attempting to send email to {user.email}')
            logger.info(f'Notification URL: {notification_url}')
            
            response = requests.post(notification_url, json=email_data, timeout=5)
            
            logger.info(f'Response status code: {response.status_code}')
            logger.info(f'Response content: {response.text}')
            
            if response.status_code == 200:
                logger.info(f'Welcome email sent successfully to {user.email}')
            else:
                logger.error(f'Failed to send welcome email. Status: {response.status_code}, Response: {response.text}')
                
        except requests.exceptions.ConnectionError as e:
            logger.error(f'Connection error when sending email: {str(e)}')
        except requests.exceptions.Timeout as e:
            logger.error(f'Timeout error when sending email: {str(e)}')
        except Exception as e:
            logger.error(f'Unexpected error sending welcome email: {str(e)}')
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        try:
            # Chỉ cần log user logout, không cần blacklist token
            # Token sẽ tự hết hạn theo thời gian đã cấu hình
            logger.info(f'User {request.user.email} logged out successfully')
            
            return Response(
                {"detail": "Đăng xuất thành công!"}, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            logger.error(f'Logout error for user {request.user.email}: {str(e)}')
            return Response(
                {"detail": "Có lỗi xảy ra khi đăng xuất"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def user(self, request):
        """
        Trả về thông tin user hiện tại dựa trên token
        Endpoint: GET /api/auth/user/
        """
        try:
            user = request.user
            return Response({
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'user_type': user.user_type,
                'is_active': user.is_active,
                'date_joined': user.date_joined,
                'username': user.username if hasattr(user, 'username') else user.email
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Unable to fetch user information',
                'detail': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)