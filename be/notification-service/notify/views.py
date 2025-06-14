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

@api_view(['POST'])
def send_bulk_email(request):
    """Gửi email hàng loạt"""
    serializer = SendEmailSerializer(data=request.data)
    if serializer.is_valid():
        recipients = request.data.get('recipients', [])
        template_name = serializer.validated_data['template_name']
        context = serializer.validated_data.get('context', {})
        
        try:
            template = EmailTemplate.objects.get(name=template_name)
            
            # Render template
            subject_template = Template(template.subject)
            body_template = Template(template.body)
            
            sent_count = 0
            for recipient in recipients:
                try:
                    subject = subject_template.render(Context(context))
                    body = body_template.render(Context(context))
                    
                    send_mail(
                        subject,
                        body,
                        settings.DEFAULT_FROM_EMAIL,
                        [recipient],
                        fail_silently=False,
                    )
                    
                    # Log successful send
                    EmailLog.objects.create(
                        recipient_email=recipient,
                        subject=subject,
                        body=body,
                        template_name=template_name,
                        status='sent'
                    )
                    sent_count += 1
                    
                except Exception as e:
                    # Log failed send
                    EmailLog.objects.create(
                        recipient_email=recipient,
                        subject=template.subject,
                        template_name=template_name,
                        status='failed',
                        error_message=str(e)
                    )
                    logger.error(f"Failed to send email to {recipient}: {str(e)}")
            
            return Response({
                'message': f'Bulk email sent successfully to {sent_count}/{len(recipients)} recipients',
                'sent_count': sent_count,
                'total_recipients': len(recipients)
            }, status=status.HTTP_200_OK)
            
        except EmailTemplate.DoesNotExist:
            return Response({'error': 'Email template not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Bulk email error: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def email_statistics(request):
    """Thống kê email"""
    from django.db.models import Count
    
    stats = {
        'total_emails': EmailLog.objects.count(),
        'sent_emails': EmailLog.objects.filter(status='sent').count(),
        'failed_emails': EmailLog.objects.filter(status='failed').count(),
        'pending_emails': EmailLog.objects.filter(status='pending').count(),
        'emails_by_template': dict(
            EmailLog.objects.exclude(template_name__isnull=True)
            .values('template_name')
            .annotate(count=Count('template_name'))
            .values_list('template_name', 'count')
        )
    }
    
    return Response(stats)

@api_view(['GET'])
def health_check(request):
    return Response({'status': 'healthy'}, status=status.HTTP_200_OK)