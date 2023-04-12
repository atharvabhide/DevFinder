from .models import Project, Review, Tag
from .serializers import ProjectSerializer, ReviewSerializer, TagSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

class ProjectListView(generics.ListAPIView):
    pagination_class = PageNumberPagination
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class ProjectRetrieveView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class ProjectCreateView(generics.CreateAPIView, ProjectListView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class ProjectUpdateView(generics.UpdateAPIView, ProjectRetrieveView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class ProjectDestroyView(generics.DestroyAPIView, ProjectRetrieveView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)