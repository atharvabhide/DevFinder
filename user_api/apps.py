from django.apps import AppConfig

class UserApi(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_api'

    def ready(self):
        import user_api.signals 
