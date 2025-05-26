from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LabTestViewSet, LabTestTemplateViewSet

router = DefaultRouter()
router.register(r'tests', LabTestViewSet, basename='labtest')
router.register(r'templates', LabTestTemplateViewSet, basename='labtesttemplate')

urlpatterns = [
    path('', include(router.urls)),
]
