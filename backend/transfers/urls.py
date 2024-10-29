from django.urls import path
from .views import VehicleViewSet, LocationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet)
router.register(r'locations', LocationViewSet)

urlpatterns = router.urls