from django.apps import AppConfig

class TransfersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'transfers'
    
    def ready(self):
        """
        Initialize any app-specific settings or signals here
        """
        try:
            import transfers.signals  # noqa
        except ImportError:
            pass