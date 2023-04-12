from django.urls import path
from .views import ProfileListView, ProfileRetrieveView, ProfileUpdateView, ProfileDestroyView, SkillListView, SkillCreateView, SkillRetrieveView, SkillUpdateView, SkillDestroyView

urlpatterns = [
    path('profiles/', ProfileListView.as_view(), name='profile-list'),
    path('profiles/<str:pk>/', ProfileRetrieveView.as_view(), name='profile-detail'),
    path('profiles/<str:pk>/update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('profiles/<str:pk>/delete/', ProfileDestroyView.as_view(), name='profile-delete'),
    path('profiles/<str:pk>/skills/', SkillListView.as_view(), name='skill-list'),
    path('profiles/<str:pk>/skills/create/', SkillCreateView.as_view(), name='skill-create'),
    path('profiles/<str:pk>/skills/<str:sk>/', SkillRetrieveView.as_view(), name='skill-detail'),
    path('profiles/<str:pk>/skills/<str:sk>/update/', SkillUpdateView.as_view(), name='skill-update'),
    path('profiles/<str:pk>/skills/<str:sk>/delete/', SkillDestroyView.as_view(), name='skill-delete'),
]