# Create your views here.
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response 
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Activity, ActivityImage, TimeSlot, Review, ActivityBooking
from .serializers import (
    ActivityImageSerializer,
    TimeSlotSerializer,
    ReviewSerializer,
    ActivitySerializer,
    ActivityBookingSerializer,
)

class ActivityViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing activities.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]

class ActivityImageViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing activity images.
    """
    queryset = ActivityImage.objects.all()
    serializer_class = ActivityImageSerializer

class TimeSlotViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing time slots.
    """
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing reviews.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ActivityBookingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing activity bookings.
    """
    queryset = ActivityBooking.objects.all()
    serializer_class = ActivityBookingSerializer

    @action(detail=True, methods=['post'], url_name='book')
    def book_activity(self, request, pk=None):
        """
        Action to create a new activity booking.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)