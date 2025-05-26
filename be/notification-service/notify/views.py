from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.template import Template, Context
from django.conf import settings
from .models import EmailTemplate, EmailLog
from .serializers import EmailTemplateSerializer, EmailLogSerializer, SendEmailSerializer
import logging

logger = logging.getLogger(__name__)

class EmailTemplateViewSet(viewsets.ModelViewSet):
    queryset = EmailTemplate.objects.all()
    serializer_class = EmailTemplateSerializer

class EmailLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EmailLog.objects.all()
    serializer_class = EmailLogSerializer

@api_view(['POST'])
def send_email(request):
    serializer = SendEmailSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
    try:
        # Lấy template
        recipient = serializer.validated_data['recipient_email']
        # Render subject và body với context
        subject = serializer.validated_data['subject']
        body = serializer.validated_data['body']
        
        
        # Gửi email
        send_mail(
            subject,
            body,
            None,  # from email, dùng DEFAULT_FROM_EMAIL
            [recipient],
            fail_silently=False,
        )
        
        # Log thành công
        EmailLog.objects.create(
            recipient_email=recipient,
            subject=subject,
            body=body,
            status='sent'
        )
        
        return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
        
    except EmailTemplate.DoesNotExist:
        EmailLog.objects.create(
            recipient_email=recipient,
            subject=subject or 'Unknown',
            status='failed',
            error_message=error_msg
        )
        return Response({'error': error_msg}, status=status.HTTP_404_NOT_FOUND)
        
    except Exception as e:
        error_msg = str(e)
        EmailLog.objects.create(
            recipient_email=recipient,
            subject=subject or 'Unknown',
            status='failed',
            error_message=error_msg
        )
        logger.error(f'Failed to send email: {error_msg}')
        return Response({'error': 'Failed to send email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def health_check(request):
    return Response({'status': 'healthy'}, status=status.HTTP_200_OK)