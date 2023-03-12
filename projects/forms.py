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
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'input'})
        self.fields['description'].widget.attrs.update({'class': 'input'})
        self.fields['demoLink'].widget.attrs.update({'class': 'input'})
        self.fields['sourceLink'].widget.attrs.update({'class': 'input'})
        self.fields['tags'].widget.attrs.update({'class': 'input'})