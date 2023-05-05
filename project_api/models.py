from django.db import models
import uuid
from user_api.models import Profile
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver


class Project(models.Model):
    owner = models.ForeignKey(to=Profile, on_delete=models.SET_NULL,
                              related_name='projects', null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    featuredImage = models.ImageField(
        null=True, blank=True, default='default.jpg', upload_to='project_images/')
    demoLink = models.CharField(max_length=2000, null=True, blank=True)
    sourceLink = models.CharField(max_length=2000, null=True, blank=True)
    tags = models.ManyToManyField('Tag', blank=True, related_name='projects')
    voteTotal = models.IntegerField(default=0, null=True, blank=True)
    voteRatio = models.IntegerField(default=0, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)

    def __str__(self):
        return f'{self.title} - {self.owner.username}' if self.owner else self.title


@receiver(models.signals.pre_save, sender=Project)
def delete_file_on_change_extension(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_avatar = Project.objects.get(pk=instance.pk).featuredImage
        except Project.DoesNotExist:
            return
        else:
            new_avatar = instance.featuredImage
            if old_avatar and old_avatar.url != new_avatar.url:
                old_avatar.delete(save=False)


@receiver(post_delete, sender=Project)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.featuredImage.delete(save=False)
    except:
        pass


class Review(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    body = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)

    def __str__(self):
        return f"{self.owner} - {self.project.title}"


class Tag(models.Model):
    name = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)

    def __str__(self):
        return self.name
