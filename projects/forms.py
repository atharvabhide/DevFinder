from django.forms import ModelForm
from django import forms
from .models import Project

class ProjectForm(ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description', 'featuredImage', 'demoLink', 'sourceLink', 'tags']
        widgets = {
            'tags'  : forms.CheckboxSelectMultiple(),
        }
    
    def __init__(self, *args, **kwargs) -> None:
        super(ProjectForm).__init__(*args, **kwargs)
        for name,field in self.fields.items():
            field.widget.attrs.update({'class':'input'})