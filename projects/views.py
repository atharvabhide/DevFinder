from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from .models import Project, Tag
from .forms import ProjectForm
from .utils import *

def projects(request):
    # gets all projects from database
    projects, search_query = searchProjects(request)
    context = {
        'projects': projects,
        'search_query' : search_query
    }
    return render(request, 'projects/projects.html', context)

def project(request, pk:str):
    # gets particular project from database
    project = Project.objects.get(id=pk)
  
    context = {
        'project': project,
        'tags' : project.tags.all(),
    }
    return render(request, 'projects/single-project.html', context)

@login_required(login_url='login')
def createProject(request):
    profile = request.user.profile
    # creates a new project
    form = ProjectForm()

    if (request.method == 'POST'):
        form = ProjectForm(request.POST, request.FILES)
        if (form.is_valid()):
            project = form.save(commit=False)
            project.owner = profile
            project.save()
            return redirect('user-account')
    context = {
        'form': form,   
    }
    return render(request, 'projects/project_form.html', context)

@login_required(login_url='login')
def updateProject(request, pk):
    profile = request.user.profile
    # updates a project
    project = profile.projects.get(id=pk)
    form = ProjectForm(instance=project)

    if (request.method == 'POST'):
        form = ProjectForm(request.POST, request.FILES, instance=project)
        if (form.is_valid()):
            form.save()
            return redirect('user-account')
    context = {
        'form': form,   
    }
    return render(request, 'projects/project_form.html', context)

@login_required(login_url='login')
def deleteProject(request, pk):
    profile = request.user.profile
    # deletes a project
    project = profile.projects.get(id=pk)

    if (request.method == 'POST'):
        project.delete()
        return redirect('user-account')
    context = {
        'project' : project
    }
    return render(request, 'projects/delete_project.html', context)