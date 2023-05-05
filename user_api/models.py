from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.mail import send_mail
import uuid
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(max_length=500, null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    shortIntro = models.CharField(max_length=200, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    profileImage = models.ImageField(null=True, blank=True, upload_to='profile_images/')
    socialGithub = models.CharField(max_length=200, null=True, blank=True)
    socialTwitter = models.CharField(max_length=200, null=True, blank=True)
    socialYoutube = models.CharField(max_length=200, null=True, blank=True)
    socialWebsite = models.CharField(max_length=200, null=True, blank=True)
    socialHashnode = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return str(self.username)

@receiver(post_save, sender=User)
def createProfile(sender, instance, created, **kwargs):
    print("Profile signal triggered")
    if (created == True):
        user = instance
        profile = Profile.objects.create(
            user=user,
            username=user.username,
            email=user.email,
            name=user.first_name,
        )
        subject = "Welcome to DevFinder!"
        to_email = [profile.email]
        html_content = render_to_string('users/welcome_email.html')
        text_content = strip_tags(html_content)
        send_mail(subject, 
                text_content, 
                settings.EMAIL_HOST_USER, 
                to_email, 
                html_message=html_content)

@receiver(post_delete, sender=Profile)
def profileDeleted(sender, instance, **kwargs):
    print("Deleting user...")
    user = instance.user
    user.delete()

@receiver(post_save, sender=Profile)
def profileUpdated(sender, instance, created, **kwargs):
    print("Updating user...")
    user = instance.user
    if (created == False):
        user.firstName = instance.name
        user.username = instance.username
        user.email = instance.email
        user.save()

class Skill(models.Model):
    owner = models.ForeignKey(to=Profile, on_delete=models.CASCADE, null=True, blank=True, related_name="skills")
    name = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False)

    def __str__(self):
        return self.name

class Message(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True, related_name= 'sender')
    recipient = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True, related_name= 'messages')
    name = models.CharField(max_length=200, null= True, blank= True)
    email = models.EmailField(max_length=200, null= True, blank= True)
    subject = models.CharField(max_length=200, null= True, blank= True)
    body = models.TextField()
    is_read = models.BooleanField(default=False, null= True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.subject

    class Meta:
        ordering = ['is_read', '-createdAt']
        
