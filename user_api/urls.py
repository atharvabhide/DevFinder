from django.urls import path, re_path, include  
from rest_framework import routers
from .views import (
    ProfileListView, ProfileCreateView, 
    ProfileRetrieveView, ProfileUpdateView, 
    ProfileDestroyView, SkillListView, 
    SkillCreateView, SkillRetrieveView, CurrentUser,
    SkillUpdateView, SkillDestroyView, 
    ListMessageAPIView, RetrieveMessageAPIView,CreateMessageAPIView,
    register_by_access_token, authentication_test, ImageModView
)

router = routers.DefaultRouter()

urlpatterns = [

    re_path('register-by-access-token/' + r'social/(?P<backend>[^/]+)/$', register_by_access_token),
    path('authentication-test/', authentication_test),

    path('current-user/', CurrentUser.as_view(), name='current-user'),

    path('profiles/', ProfileListView.as_view(), name='profile-list'),
    path('profiles/create/', ProfileCreateView.as_view(), name='profile-create'),

    path('profiles/<str:pk>/', ProfileRetrieveView.as_view(), name='profile-detail'),
    path('profiles/<str:pk>/update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('profiles/<str:pk>/delete/', ProfileDestroyView.as_view(), name='profile-delete'),
    path('profiles/<str:pk>/skills/', SkillListView.as_view(), name='skill-list'),
    path('profiles/<str:pk>/skills/create/', SkillCreateView.as_view(), name='skill-create'),
    path('profiles/<str:pk>/skills/<str:sk>/', SkillRetrieveView.as_view(), name='skill-detail'),
    path('profiles/<str:pk>/skills/<str:sk>/update/', SkillUpdateView.as_view(), name='skill-update'),
    path('profiles/<str:pk>/skills/<str:sk>/delete/', SkillDestroyView.as_view(), name='skill-delete'),

    path('profiles/<str:pk>/messages/', ListMessageAPIView.as_view(), name='message-list'),
    path('profiles/<str:pk>/create-message/', CreateMessageAPIView.as_view(), name='message-create'),
    path('profiles/<str:pk>/messages/<str:sk>/', RetrieveMessageAPIView.as_view(), name='view-message'),
    path('image/mod/', ImageModView.as_view(), name = 'image-moderation'),
]