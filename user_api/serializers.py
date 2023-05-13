from .models import Profile, Skill, Message
from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('first_name', 'username', 'email', 'password')
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(first_name = validated_data['first_name'], username = validated_data['username'], email = validated_data['email'] , password = validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
    
    def __str__(self) -> str:
        return self.name

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    # user = UserSerializer()
    skills = serializers.StringRelatedField(many=True)
    messages_sent = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='message-list', source='sender')
    messages_received = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='message-list', source='messages')
    class Meta:
        model = Profile
        exclude = ['user']

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.HyperlinkedRelatedField(view_name='profile-detail', read_only=True)
    recipient = serializers.HyperlinkedRelatedField(view_name='profile-detail', read_only=True)
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    pfp = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'

    def get_name(self, obj):
        return obj.sender.user.username if obj.sender else None

    def get_email(self, obj):
        return obj.sender.user.email if obj.sender else None

    def get_pfp(self, obj):
        return obj.sender.profileImage.url if obj.sender else None
    
    def perform_create(self, serializer):
        profile_pk = self.kwargs.get("pk")
        try:
            profile = Profile.objects.get(pk=profile_pk)
        except Profile.DoesNotExist:
            raise serializers.ValidationError(f"Profile with ID {profile_pk} does not exist")
        serializer.save(sender=self.request.user.profile, recipient=profile)




