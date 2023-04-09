from django.urls import path
from .views import ProfileListView, ProfileRetrieveUpdateDestroyView, SkillListView, SkillRetrieveUpdateDestroyView

urlpatterns = [
    path('profiles/', ProfileListView.as_view(), name='profile-list'),
    path('profiles/<str:pk>/', ProfileRetrieveUpdateDestroyView.as_view(), name='profile-detail'),
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('skills/<str:pk>/', SkillRetrieveUpdateDestroyView.as_view(), name='skill-detail'),
]