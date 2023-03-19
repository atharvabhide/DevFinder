from django.shortcuts import render
from .models import Profile

def profiles(request):
    profiles = Profile.objects.all()
    context = {"profiles" : profiles}
    return render(request, 'users/profiles.html', context=context)

def userProfile(request, pk):
    profile = Profile.objects.get(id=pk)

    topSkills = profile.skills.exclude(description__exact="")
    otherSkills = profile.skills.filter(description="")
    projects = profile.projects.all()

    context = {"profile" : profile, "topSkills" : topSkills, "otherSkills" : otherSkills, "projects" : projects}
    return render(request, 'users/user-profile.html', context=context)