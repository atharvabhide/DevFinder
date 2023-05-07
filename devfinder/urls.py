from django.contrib import admin
from django.urls import path, include, re_path
from . import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

class APIRootView(APIView):
    """
    API endpoint that lists all the APIs.

    No authentication required. 
    """
    def get(self, request):
        return Response({
        'admin': '/admin/',
        'user-api': '/user-api/',
        'project-api': '/project-api/',
        'api-auth': 'api/auth/',
        'api-token-auth': 'api/token/[name="token_obtain_pair"]',
        'api-token-refresh': "api/token/refresh/[name='token_refresh']",
        'social-auth': "social-auth/",
        'reset_password': "reset_password/[name='reset_password']",
        'reset_password_sent':"reset_passwword_sent/[name='password_reset_done']",
        'reset_password_confirm': "reset/<uidb64>/<token>[name='password_reset_confirm']",
        'reset_password_complete': "reset_password_complete [name='password_reset_complete']",
        'media': "^media/(?P<path>.*)$",
        })

urlpatterns = [

    path('', APIRootView.as_view(), name='api-root'),

    path('admin/', admin.site.urls),
    path('user-api/', include('user_api.urls')),
    path('project-api/', include('project_api.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # jwt
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('social-auth/', include('social_django.urls', namespace='social')),
    path('reset_password/', auth_views.PasswordResetView.as_view(), name = 'reset_password'),
    path('reset_passwword_sent/', auth_views.PasswordResetDoneView.as_view(), name = 'password_reset_done'),
    path('reset/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(), name = 'password_reset_confirm'),
    path('reset_password_complete', auth_views.PasswordResetCompleteView.as_view(), name = 'password_reset_complete'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
