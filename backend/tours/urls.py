from django.urls import path
from .views import TourViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', TourViewSet)

urlpatterns = router.urls