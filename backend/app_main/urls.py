from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(prefix="subjects", viewset=views.SubjectViewSet, basename="subjects")

urlpatterns = router.urls
