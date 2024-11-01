from rest_framework import viewsets, status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response 
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSpecificUser

from .models import Activity, ActivityImage, TimeSlot, Review, ActivityBooking
from .serializers import (
    ActivityImageSerializer,
    TimeSlotSerializer,
    ReviewSerializer,
    ActivitySerializer,
    ActivityBookingSerializer,
)


class ActivityViewSet(viewsets.ModelViewSet):
    
    queryset = Activity.objects.filter(is_active=True)
    serializer_class = ActivitySerializer
    # permission_classes = [IsAuthenticated, IsSpecificUser]
    # authentication_classes = [JWTAuthentication]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['activity_type']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['price', 'created_at', 'rating']
    ordering = ['-created_at']  # Default ordering

    def get_queryset(self):
        queryset = super().get_queryset()
        # Custom filtering logic
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        
        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)
        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)
            
        return queryset

class ActivityImageViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing activity images.
    """
    queryset = ActivityImage.objects.all()
    serializer_class = ActivityImageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['activity']

class TimeSlotViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing time slots.
    """
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['activity', 'date', 'is_available']
    ordering_fields = ['date', 'start_time']
    ordering = ['date', 'start_time']

class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing reviews.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['activity', 'rating']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']

class ActivityBookingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing activity bookings.
    """
    queryset = ActivityBooking.objects.all()
    serializer_class = ActivityBookingSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['activity', 'status', 'booking_date']
    ordering_fields = ['booking_date', 'created_at']
    ordering = ['-created_at']

    @action(detail=True, methods=['post'], url_name='book')
    def book_activity(self, request, pk=None):
        """
        Action to create a new activity booking.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)