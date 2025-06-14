from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'templates', views.EmailTemplateViewSet)
router.register(r'logs', views.EmailLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('send-email/', views.send_email, name='send_email'),
    path('send-bulk-email/', views.send_bulk_email, name='send_bulk_email'),
    path('statistics/', views.email_statistics, name='email_statistics'),
    path('health/', views.health_check, name='health_check'),
]