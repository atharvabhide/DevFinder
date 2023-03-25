from django.forms import Form
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

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