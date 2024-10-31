from rest_framework import permissions


class isAdminUserReadOnly(permissions.IsAdminUser):
    def has_permission(self, request, view):
        if request.user and request.user.is_staff:
            return request.method in permissions.SAFE_METHODS
        return super().has_permission(request, view)
    
class IsSpecificUser(permissions.BasePermission):
    allowed_usernames = ['qam', 'test2', 'qamar']

    def has_permission(self, request, view):
        return request.user.username in self.allowed_usernames