from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(max_length=500, null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    shortIntro = models.CharField(max_length=200, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    profileImage = models.ImageField(null=True, blank=True, upload_to='profiles/', default='profiles/user-default.png')
    socialGithub = models.CharField(max_length=200, null=True, blank=True)
    socialLinkedIn = models.CharField(max_length=200, null=True, blank=True)
    socialTwitter = models.CharField(max_length=200, null=True, blank=True)
    socialYoutube = models.CharField(max_length=200, null=True, blank=True)
    socialWebsite = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return str(self.username)

class Skill(models.Model):
    owner = models.ForeignKey(to=Profile, on_delete=models.CASCADE, null=True, blank=True, related_name="skills")
    name = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False)

    def __str__(self):
        return self.name