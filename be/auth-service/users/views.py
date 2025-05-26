from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, LoginSerializer, ChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny , IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
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
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            self.send_welcome_email(user)
            return Response({"detail": "Đăng ký thành công!"}, status=status.HTTP_201_CREATED)
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