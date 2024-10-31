from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ActivityViewSet,
    ActivityImageViewSet,
    TimeSlotViewSet,
    ReviewViewSet,
    ActivityBookingViewSet,
)

router = DefaultRouter()
router.register(r'', ActivityViewSet)
router.register(r'activities/(?P<activity_pk>\d+)/images', ActivityImageViewSet)
router.register(r'time_slots', TimeSlotViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'bookings', ActivityBookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]