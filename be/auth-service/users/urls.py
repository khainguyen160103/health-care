from django.urls import path
from .views import UserViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register(r'auth', UserViewSet, basename='auth')

urlpatterns = router.urls