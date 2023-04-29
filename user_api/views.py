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


class ProfileCreateView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.save()
        return Response({
            "profile": ProfileSerializer(profile, context=self.get_serializer_context()).data,
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
    # permission_classes = [IsAuthenticated]
    
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

class CreateMessageAPIView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class ListMessageAPIView(ListAPIView):
    serializer_class = MessageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        profile = self.request.user.profile
        return profile.messages.all()


class RetrieveMessageAPIView(RetrieveAPIView):
    serializer_class = MessageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def get_queryset(self):
        profile = self.request.user.profile
        return profile.messages.all()
