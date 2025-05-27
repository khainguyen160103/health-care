from rest_framework.permissions import BasePermission

class IsPatient(BasePermission):
    """
    Chỉ cho phép user có user_type là 'patient'
    """
    def has_permission(self, request, view):
        return hasattr(request.user, 'user_type') and request.user.user_type == 'patient'