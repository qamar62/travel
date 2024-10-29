from django.urls import path
from .views import AttractionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', AttractionViewSet)

urlpatterns = router.urls