from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, VIPPatientViewSet, RegularPatientViewSet

router = DefaultRouter()
router.register(r'', PatientViewSet, basename='patient')
router.register(r'vip', VIPPatientViewSet, basename='vip-patient')
router.register(r'regular', RegularPatientViewSet, basename='regular-patient')

urlpatterns = router.urls
