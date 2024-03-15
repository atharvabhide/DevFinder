from django.urls import path, re_path, include  
from rest_framework import routers
from rest_framework.views import APIView
from rest_framework.response import Response
from .views import (
    ProfileListView, ProfileCreateView, 
    ProfileRetrieveView, ProfileUpdateView, 
    ProfileDestroyView, SkillListView, 
    SkillCreateView, SkillRetrieveView, CurrentUser,
    SkillUpdateView, SkillDestroyView, 
    ListMessageAPIView, RetrieveMessageAPIView,CreateMessageAPIView,
    register_by_access_token, authentication_test, SimilarUserView,
    ProjectRetrieveView,
)

class UserRootAPIView(APIView):
    """
    API endpoint that lists all the User APIs.

    No authentication required. 
    """
    def get(self, request):
        return Response({
        'user-list': 'profiles/',
        'user-create': 'profiles/create/',
        'user-detail': 'profiles/<str:pk>/',
        'user-update': 'profiles/<str:pk>/update/',
        'user-delete': 'profiles/<str:pk>/delete/',
        'user-skills': 'profiles/<str:pk>/skills/',
        'user-skills-create': 'profiles/<str:pk>/skills/create/',
        'user-skills-detail': 'profiles/<str:pk>/skills/<str:sk>/',
        'user-skills-update': 'profiles/<str:pk>/skills/<str:sk>/update/',
        'user-skills-delete': 'profiles/<str:pk>/skills/<str:sk>/delete/',
        'user-messages': 'profiles/<str:pk>/messages/',
        'user-messages-create': 'profiles/<str:pk>/create-message/',
        'user-messages-detail': 'profiles/<str:pk>/messages/<str:sk>/',
        'current-user': 'current-user/',
        'register-by-access-token': 'register-by-access-token/',
        'authentication-test': 'authentication-test/',
        # 'image-moderation': 'image/mod/',
        })

router = routers.DefaultRouter()

urlpatterns = [
    path('', UserRootAPIView.as_view(), name='user-api-root'),
    re_path('register-by-access-token/' + r'social/(?P<backend>[^/]+)/$', register_by_access_token),
    path('authentication-test/', authentication_test),

    path('current-user/', CurrentUser.as_view(), name='current-user'),
    path('similar/', SimilarUserView.as_view(), name='similar-list'),
    path('profiles/', ProfileListView.as_view(), name='profile-list'),
    path('profiles/create/', ProfileCreateView.as_view(), name='profile-create'),

    path('profiles/<str:pk>/', ProfileRetrieveView.as_view(), name='profile-detail'),
    path('profiles/<str:pk>/projects/', ProjectRetrieveView.as_view(), name='project-list'),
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
    # path('image/mod/', ImageModView.as_view(), name = 'image-moderation'),
]
