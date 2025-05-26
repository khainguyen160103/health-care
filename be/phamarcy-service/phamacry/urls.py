from rest_framework.routers import DefaultRouter
from .views import MedicationViewSet, PrescriptionViewSet, InventoryViewSet

router = DefaultRouter()
router.register(r'medications', MedicationViewSet)
router.register(r'prescriptions', PrescriptionViewSet)
router.register(r'inventory', InventoryViewSet)

urlpatterns = router.urls