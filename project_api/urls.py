from django.urls import path
from . import views
from rest_framework.views import APIView 
from rest_framework.response import Response

class ProjectAPIRootView(APIView):
    """
    API endpoint that lists all the Project APIs.

    No authentication required. 
    """
    def get(self, request):
        return Response({
        'projects-list': 'projects/',
        'projects-create': 'projects/create/',
        'projects-detail': 'projects/<str:pk>/',
        'projects-update': 'projects/<str:pk>/update/',
        'projects-delete': 'projects/<str:pk>/delete/',
        'projects-tags': 'projects/<str:pk>/tags/',
        'projects-tags-create': 'projects/<str:pk>/tags/create/',
        'projects-reviews-create': 'projects/<str:pk>/reviews/create/',
        'projects-reviews': 'projects/<str:pk>/reviews/',
        'review-moderation': 'review/mod/',
        'image-moderation': 'image/mod/',
        })

urlpatterns = [
    path('', ProjectAPIRootView.as_view(), name='project-api-root'),
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/create/', views.ProjectCreateView.as_view(), name='project-list'),
    path('projects/<str:pk>/', views.ProjectRetrieveView.as_view(), name='project-detail'),
    path('projects/<str:pk>/update/', views.ProjectUpdateView.as_view(), name='project-update'),
    path('projects/<str:pk>/delete/', views.ProjectDestroyView.as_view(), name='project-delete'),
    path('projects/<str:pk>/tags/', views.TagListView.as_view(), name = 'tag-list'),
    path('projects/<str:pk>/tags/create/', views.TagCreateView.as_view(), name = 'tag-create'),
    path('projects/<str:pk>/reviews/create/', views.ReviewCreateView.as_view(), name = 'review-create'),
    path('projects/<str:pk>/reviews/', views.ReviewListView.as_view(), name = 'review-list'),
    path('review/mod/', views.ReviewModView.as_view(), name = 'review-moderation'),
    path('image/mod/', views.ImageModView.as_view(), name = 'image-moderation'),
]