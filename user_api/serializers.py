from .models import Profile, Skill
from rest_framework import serializers
from django.contrib.auth.models import User

class SkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()
    skills = serializers.StringRelatedField(many=True)
    class Meta:
        model = Profile
        fields = '__all__'