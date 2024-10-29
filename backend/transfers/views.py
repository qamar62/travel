from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Vehicle, Location
from .serializers import VehicleSerializer, LocationSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'max_passengers']
    search_fields = ['name', 'description']
    ordering_fields = ['base_price', 'max_passengers']

    def get_queryset(self):
        queryset = Vehicle.objects.all()
        passengers = self.request.query_params.get('passengers', None)
        luggage = self.request.query_params.get('luggage', None)

        if passengers:
            queryset = queryset.filter(max_passengers__gte=passengers)
        if luggage:
            queryset = queryset.filter(max_luggage__gte=luggage)

        return queryset

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['type', 'is_popular']
    search_fields = ['name']