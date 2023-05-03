from django.contrib import admin
from django.urls import path, include, re_path
from . import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
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
