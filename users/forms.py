from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'email', 'username', 'password1', 'password2']
        labels = {
            'first_name': 'Name',
        }
    
    def __init__(self, *args, **kwargs) -> None:
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        for name,field in self.fields.items():
            field.widget.attrs.update({'class':'input'})

class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'email', 'username', 'location', 'bio', 'shortIntro', 'profileImage', 'socialGithub', 'socialLinkedIn', 'socialTwitter', 'socialYoutube', 'socialWebsite']

    def __init__(self, *args, **kwargs) -> None:
        super(ProfileForm, self).__init__(*args, **kwargs)
        for name,field in self.fields.items():
            field.widget.attrs.update({'class':'input'})