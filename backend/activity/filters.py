import django_filters
from .models import Activity

class ActivityFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    location = django_filters.CharFilter(field_name="location", lookup_expr='icontains')
    category = django_filters.CharFilter(field_name="category", lookup_expr='iexact')
    available_date = django_filters.DateFilter(field_name="time_slots__date")
    rating_gte = django_filters.NumberFilter(field_name="rating", lookup_expr='gte')

    class Meta:
        model = Activity
        fields = ['category', 'location', 'min_price', 'max_price', 'rating_gte']
