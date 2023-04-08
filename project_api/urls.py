from django.urls import path
from .views import ProjectListView, ProjectCreateRetrieveUpdateDestroyView, ReviewListView, ReviewCreateRetrieveUpdateDestroyView, TagListView, TagCreateRetrieveUpdateDestroyView

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<str:pk>/', ProjectCreateRetrieveUpdateDestroyView.as_view(), name='project-detail'),
    path('projects/<str:pk>/reviews/', ReviewListView.as_view(), name='review-list'),
    path('projects/<str:pk>/reviews/<str:review_pk>/', ReviewCreateRetrieveUpdateDestroyView.as_view(), name='review-detail'),
    path('tags/', TagListView.as_view(), name='tag-list'),
    path('tags/<str:pk>/', TagCreateRetrieveUpdateDestroyView.as_view(), name='tag-detail'),
]