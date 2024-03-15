from .models import Profile, Skill, Message
from project_api.models import Project 
from .serializers import ProfileSerializer, SkillSerializer, UserSerializer, MessageSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer
from project_api.serializers import ProjectSerializer
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from social_django.utils import psa
from rest_framework_simplejwt.tokens import RefreshToken
# import opennsfw2 as nsfw
from rest_framework.parsers import MultiPartParser
from PIL import Image
from io import BytesIO
from rest_framework.views import APIView
from rest_framework import serializers

@api_view(['POST'])
@permission_classes([AllowAny])
@psa()
def register_by_access_token(request, backend):
    """ 
    Register a new user using an access token from a social provider.
    
    No authentication required."""
    token = request.data.get('access_token')
    user = request.backend.do_auth(token)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
            )
        # token, _ = Token.objects.get_or_create(user=user)
        # return Response(
        #     {
        #         'token': token.key
        #     },
        #     status=status.HTTP_200_OK,
        #     )
    else:
        return Response(
            {
                'errors': {
                    'token': 'Invalid token'
                    }
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(['GET', 'POST'])
def authentication_test(request):
    """ 
    Test authentication.
    
    Authentication required."""
    print(request.user)
    return Response(
        {
            'message': "User successfully authenticated"
        },
        status=status.HTTP_200_OK,
    )

# get hyperlink of user who is currently logged in
@api_view(['GET'])
def current_profile_hyperlink(request):
    """ 
    Get hyperlink of user who is currently logged in.
    
    Authentication required."""
    profile = Profile.objects.get(user=request.user)
    serializer = ProfileSerializer(profile, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

class ProfileCreateView(generics.GenericAPIView):
    """ 
    API endpoint that creates a profile.
    
    Authentication required."""
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "Profile Created Successfully. Now perform Login to get your token",
        })

class UsersPagination(PageNumberPagination):
    """ 
    Pagination for users.
    
    Authentication required."""
    page_size_query_param = 'page_size'

    def get_page_size(self, request):
        # Get the total count of projects
        total_profiles = Profile.objects.count()
        # Set the page size to the total number of projects
        return total_profiles

class ProfileListView(ListAPIView):
    """ 
    API endpoint that allows users to be viewed.
    
    Authentication required."""
    pagination_class = UsersPagination
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class ProfileRetrieveView(RetrieveAPIView):
    """ 
    API endpoint that allows a user to be viewed.
    
    Authentication required."""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class ProfileUpdateView(UpdateAPIView, ProfileRetrieveView):
    """ 
    API endpoint that allows a user to be updated.
    
    Authentication required."""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def perform_update(self, serializer):
        user_data = serializer.validated_data.pop('user', None)

        # Call super() method to perform the update
        super().perform_update(serializer)

        # Update user information if present
        if user_data:
            user_serializer = UserSerializer(instance=serializer.instance.user, data=user_data)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

class ProfileDestroyView(DestroyAPIView, ProfileRetrieveView):
    """ 
    API endpoint that allows a user to be deleted.
    
    Authentication required."""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class SkillListView(APIView):
    """ 
    API endpoint that allows skills to be viewed.
    
    Authentication required."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        uuid = self.request.get_full_path().split('/profiles/')[1].split('/')[0]
        profile = Profile.objects.get(id=uuid)
        skills = Skill.objects.filter(owner=profile)
        serializer = SkillSerializer(skills, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class SkillCreateView(APIView):
    """ 
    API endpoint that allows skills to be created.
    
    Authentication required."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        profile = Profile.objects.get(user=user)
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SkillRetrieveView(APIView):
    """ 
    API endpoint that allows a skill to be viewed.
    
    Authentication required."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        uuid = self.request.get_full_path().split('/profiles/')[1].split('/')[0]
        profile = Profile.objects.get(id=uuid)
        skills = Skill.objects.filter(owner=profile).filter(id=kwargs['pk'])
        serializer = SkillSerializer(skills, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class SkillUpdateView(APIView):
    """ 
    API endpoint that allows a skill to be updated.
    
    Authentication required."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        uuid_profile = self.request.get_full_path().split('/profiles/')[1].split('/')[0]
        uuid_skill = self.request.get_full_path().split('/skills/')[1].split('/')[0]
        profile = Profile.objects.get(id=uuid_profile)
        skill = Skill.objects.filter(owner=profile).filter(id=uuid_skill)
        serializer = SkillSerializer(skill, context={'request': request}, data=dict(skill))
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SkillDestroyView(APIView):
    """ 
    API endpoint that allows a skill to be deleted.
    
    Authentication required."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        uuid_profile = self.request.get_full_path().split('/profiles/')[1].split('/')[0]
        uuid_skill = self.request.get_full_path().split('/skills/')[1].split('/')[0]
        profile = Profile.objects.get(id=uuid_profile)
        skill = Skill.objects.filter(owner=profile).filter(id=uuid_skill)
        skill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ListMessageAPIView(generics.ListAPIView):
    """ 
    API endpoint that allows messages to be viewed.
    
    Authentication required."""
    serializer_class = MessageSerializer

    def get_queryset(self):
        profile = self.request.user.profile
        message_requests = profile.messages.all()
        unread_count = message_requests.filter(is_read=False).count()
        self.unread_count = unread_count
        return message_requests
    
class RetrieveMessageAPIView(generics.RetrieveAPIView):
    """ 
    API endpoint that allows a message to be viewed.
    
    Authentication required."""
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

class CreateMessageAPIView(generics.CreateAPIView):
    """ 
    API endpoint that allows a message to be created.
    
    Authentication required."""
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        profile_pk = self.kwargs.get('pk')
        try:
            profile = Profile.objects.get(pk=profile_pk)
        except Profile.DoesNotExist:
            raise serializers.ValidationError(f"Profile with ID {profile_pk} does not exist")
        serializer.save(sender=self.request.user.profile, recipient=profile)

class SimilarUserView(ListAPIView):
    """ 
    API endpoint that allows a user to be viewed.

    Authentication required."""
    serializer_class = ProfileSerializer

    def get_queryset(self):
        # Retrieve the current user's skills
        current_user_skills = self.request.user.profile.skills.all()
        # Retrieve other users with similar skills
        similar_users = Profile.objects.filter(
            Q(skills__name__in=[s.name for s in current_user_skills]) & ~Q(user=self.request.user)
        )[:6]
        return similar_users

class CurrentUser(RetrieveAPIView):
    """ 
    API endpoint that allows a user to be viewed.
    
    Authentication required."""
    def get(self, request, *args, **kwargs):
        return Response({'uuid': str(request.user.profile.id)})
    
# class ImageModView(APIView):
#     """ 
#     API endpoint that allows a user to be viewed.
    
#     Authentication required."""
#     parser_classes = (MultiPartParser,)
#     def post(self, request, format=None):
#         if 'image' not in request.data:
#             return Response({'error': 'Image not found'}, status=400)
#         image = request.data['image']
#         pil_image = Image.open(BytesIO(image.read()))
#         prediction = nsfw.predict_image(pil_image)
#         if prediction > 0.7:
#             return Response({'prediction': 'image is nsfw'})
#         else:
#             return Response({'prediction': 'image is not nsfw'})

class ProjectRetrieveView(generics.ListAPIView):
    """ 
    API endpoint that allows a project to be viewed.
    
    Authentication required."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        uuid_profile = self.request.get_full_path().split('/profiles/')[1].split('/')[0]
        profile = Profile.objects.get(id=uuid_profile)
        return Project.objects.filter(owner=profile)
    
    serializer_class = ProjectSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
