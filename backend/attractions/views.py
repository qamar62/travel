from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Attraction
from .serializers import AttractionSerializer

class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['price', 'rating']
    search_fields = ['name', 'description', 'location']
    ordering_fields = ['price', 'rating', 'created_at']