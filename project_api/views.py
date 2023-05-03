from .models import Project, Review, Tag
from .serializers import ProjectSerializer, ReviewSerializer,TagSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from profanity_check import predict
import opennsfw2 as nsfw
from rest_framework.parsers import MultiPartParser
from PIL import Image
from io import BytesIO

# class ProjectsPagination(PageNumberPagination):
#     page_size_query_param = 'page_size'

#     def get_page_size(self, request):
#         # Get the total count of projects
#         total_projects = Project.objects.count()
#         # Set the page size to the total number of projects
#         return total_projects


class ProjectListView(generics.ListAPIView):
    """
    API endpoint that lists all projects.

    No authentication required. 
    """
    pagination_class = PageNumberPagination
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class ProjectRetrieveView(generics.RetrieveAPIView):
    """  
    API endpoint that retrieves a project.
    
    No authentication required.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class ProjectCreateView(generics.CreateAPIView, ProjectListView):
    """ 
    API endpoint that creates a project.
    
    Authentication required.
    """
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class ProjectUpdateView(generics.UpdateAPIView, ProjectRetrieveView):
    """ 
    API endpoint that updates a project.
    
    Authentication required.
    """
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class ProjectDestroyView(generics.DestroyAPIView, ProjectRetrieveView):
    """ 
    API endpoint that deletes a project.
    
    Authentication required."""
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)



class TagCreateView(generics.CreateAPIView):
    serializer_class = TagSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # add the project to the `projects` field of the tag instance
        project_pk = self.kwargs.get('pk')
        try:
            project = Project.objects.get(pk=project_pk)
        except Project.DoesNotExist:
            return Response({"error": f"Project with ID {project_pk} does not exist"}, status=status.HTTP_404_NOT_FOUND)

        tag = serializer.save()
        tag.projects.add(project)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class TagListView(generics.ListAPIView):
    serializer_class = TagSerializer
    lookup_field = 'pk'
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Tag.objects.filter(projects__pk=pk)


class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        project_pk = self.kwargs.get('pk')
        return Review.objects.filter(project__pk=project_pk)

class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        project_pk = self.kwargs.get('pk')
        try:
            project = Project.objects.get(pk=project_pk)
        except Project.DoesNotExist:
            return Response({"error": f"Project with ID {project_pk} does not exist"}, status=status.HTTP_404_NOT_FOUND)

        review = Review.objects.create(
            project=project,
            body=serializer.validated_data['body'],
            value=serializer.validated_data['value'],
        )

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class ReviewModView(APIView):
    def post(self, request):
        review = request.data['comment']
        if predict([review])[0] == 1:
            return Response({"prediction": "Review contains profanity"})
        else:
            return Response({"prediction": "Review is clean"})

class ImageModView(APIView):
    parser_classes = (MultiPartParser,)
    def post(self, request, format=None):
        if 'image' not in request.data:
            return Response({'error': 'Image not found'}, status=400)
        image = request.data['image']
        pil_image = Image.open(BytesIO(image.read()))
        prediction = nsfw.predict_image(pil_image)
        if prediction > 0.7:
            return Response({'prediction': 'image is nsfw'})
        else:
            return Response({'prediction': 'image is not nsfw'})