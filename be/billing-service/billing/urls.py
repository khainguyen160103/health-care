from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BillViewSet, InsuranceClaimViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'bills', BillViewSet, basename='bill')
router.register(r'insurance-claims', InsuranceClaimViewSet, basename='insurance-claim')
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
]
