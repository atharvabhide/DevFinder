from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/create/', views.ProjectCreateView.as_view(), name='project-list'),
    path('projects/<str:pk>/', views.ProjectRetrieveView.as_view(), name='project-detail'),
    path('projects/<str:pk>/update/', views.ProjectUpdateView.as_view(), name='project-update'),
    path('projects/<str:pk>/delete/', views.ProjectDestroyView.as_view(), name='project-delete'),
    path('projects/<str:pk>/tags/', views.TagListView.as_view(), name = 'tag-list'),
    path('projects/<str:pk>/tags/create', views.TagCreateView.as_view(), name = 'tag-create'),
    path('projects/<str:pk>/reviews/create', views.ReviewCreateView.as_view(), name = 'review-create'),
    path('projects/<str:pk>/reviews/', views.ReviewListView.as_view(), name = 'review-list'),

]