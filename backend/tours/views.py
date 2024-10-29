from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Tour, TourImage, TourDate
from .serializers import TourSerializer, TourImageSerializer, TourDateSerializer

class TourViewSet(viewsets.ModelViewSet):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [AllowAny]  # Allow unauthenticated access
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['location', 'price', 'duration']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['price', 'rating', 'created_at']

    def get_queryset(self):
        queryset = Tour.objects.prefetch_related('images', 'dates').all()
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        date = self.request.query_params.get('date', None)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if date:
            queryset = queryset.filter(dates__date=date)

        return queryset