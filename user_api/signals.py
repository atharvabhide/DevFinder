

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings



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

        subject = 'Welcome to DevFinder'
        message = 'We are glad you chose us!'
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [profile.email],
            fail_silently= False
        )