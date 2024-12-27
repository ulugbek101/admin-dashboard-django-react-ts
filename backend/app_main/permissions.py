from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdminOrSuperUser(BasePermission):
    """
    Custom permission to allow only superusers and admin users to perform
    create, update, and delete actions. Other users can only view the subjects.
    """

    def has_permission(self, request, view):
        # Allow all users to view (GET requests)
        if request.method in SAFE_METHODS:
            return True

        # Allow only superusers or admin users for write actions (POST, PUT, DELETE)
        return request.user.is_superuser or request.user.is_staff
