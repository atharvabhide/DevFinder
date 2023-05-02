from .models import Profile, Skill, Message
from .serializers import ProfileSerializer, SkillSerializer, UserSerializer, MessageSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from social_django.utils import psa
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
@permission_classes([AllowAny])
@psa()
def register_by_access_token(request, backend):
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
    print(request.user)
    return Response(
        {
            'message': "User successfully authenticated"
        },
        status=status.HTTP_200_OK,
    )

@api_view(['GET'])
def get_user(request):
    user = request.user
    return Response(
        {
            'user': UserSerializer(user).data
        },
        status=status.HTTP_200_OK,
    )

class ProfileCreateView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "Profile Created Successfully. Now perform Login to get your token",
        })

class ProfileListView(ListAPIView):
    pagination_class = PageNumberPagination
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class ProfileRetrieveView(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class ProfileUpdateView(UpdateAPIView, ProfileRetrieveView):
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
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class SkillListView(ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class SkillCreateView(CreateAPIView, SkillListView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
class SkillRetrieveView(RetrieveAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class SkillUpdateView(UpdateAPIView, SkillRetrieveView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class SkillDestroyView(DestroyAPIView, SkillRetrieveView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class ListMessageAPIView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        profile, created = Profile.objects.get_or_create(user=user)
        queryset = Message.objects.filter(recipient=profile)
        return queryset

    def perform_create(self, serializer):
        recipient_id = self.kwargs.get('pk')
        recipient = Profile.objects.get(id=recipient_id)
        sender = self.request.user.profile
        email = self.request.user.profile.email
        name = self.request.user.profile.name
        serializer.save(sender=sender, recipient=recipient, email = email, name = name)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RetrieveMessageAPIView(generics.RetrieveAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    # permission_classes = [IsAuthenticated]

class SimilarUserView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        # Retrieve the current user's skills
        current_user_skills = self.request.user.profile.skills.all()

        # Retrieve other users with similar skills
        similar_users = Profile.objects.filter(
            Q(skills__in=current_user_skills) & ~Q(user=self.request.user)
        )

        return similar_users

