from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Booking, Payment
from .serializers import BookingSerializer, PaymentSerializer

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'service_type']

    def get_queryset(self):
        if self.request.user.is_staff:
            return Booking.objects.all()
        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        if booking.status == 'pending' or booking.status == 'confirmed':
            booking.status = 'cancelled'
            booking.save()
            return Response({'status': 'booking cancelled'})
        return Response(
            {'error': 'booking cannot be cancelled'},
            status=status.HTTP_400_BAD_REQUEST
        )
        
        
# 2 

# class BookingViewSet(viewsets.ModelViewSet):
#     serializer_class = BookingSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
    
#     def get_queryset(self):
#         if self.request.user.is_staff:
#             return Booking.objects.all()
#         return Booking.objects.filter(user=self.request.user)
    
#     def perform_create(self, serializer):
#         tour = serializer.validated_data['tour']
#         tour_date = serializer.validated_data['tour_date']
#         participants = serializer.validated_data['number_of_participants']
        
#         # Calculate total price based on base price, participants, and date modifier
#         total_price = tour.base_price * participants * tour_date.price_modifier
        
#         serializer.save(
#             user=self.request.user,
#             total_price=total_price,
#             status='pending'
#         )