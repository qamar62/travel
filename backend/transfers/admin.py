from django.contrib import admin
from .models import Vehicle, Location

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'max_passengers', 'max_luggage', 'base_price')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('name', 'category', 'description', 'image')
        }),
        ('Capacity & Pricing', {
            'fields': ('max_passengers', 'max_luggage', 'price_per_km', 'base_price')
        }),
        ('Additional Info', {
            'fields': ('features', 'cancellation_policy', 'terms', 'created_at', 'updated_at')
        }),
    )

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'is_popular')
    list_filter = ('type', 'is_popular')
    search_fields = ('name',)
    fieldsets = (
        (None, {
            'fields': ('name', 'type', 'is_popular')
        }),
        ('Coordinates', {
            'fields': ('latitude', 'longitude')
        }),
    )