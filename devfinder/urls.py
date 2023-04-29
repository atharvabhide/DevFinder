from django.contrib import admin
from django.urls import path, include, re_path
from . import settings
from django.conf.urls.static import static


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

    # oauth
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
