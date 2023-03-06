from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Project
from .forms import ProjectForm

def projects(request):
    projects = Project.objects.all()
    context = {
        'projects': projects
    }
    return render(request, 'projects/projects.html', context)

def project(request, pk:str):
    project = Project.objects.get(id=pk)
    context = {
        'project': project,
        'tags' : project.tags.all()
    }
    return render(request, 'projects/single-project.html', context)

def createProject(request):
    form = ProjectForm()

    if (request.method == 'POST'):
        form = ProjectForm(request.POST, request.FILES)
        if (form.is_valid()):
            form.save()
            return redirect('projects')
    context = {
        'form': form,   
    }
    return render(request, 'projects/project_form.html', context)

def updateProject(request, pk):
    project = Project.objects.get(id=pk)
    form = ProjectForm(instance=project)

    if (request.method == 'POST'):
        form = ProjectForm(request.POST, request.FILES, instance=project)
        if (form.is_valid()):
            form.save()
            return redirect('projects')
    context = {
        'form': form,   
    }
    return render(request, 'projects/project_form.html', context)

def deleteProject(request, pk):
    project = Project.objects.get(id=pk)

    if (request.method == 'POST'):
        project.delete()
        return redirect('projects')
    context = {
        'project' : project
    }
    return render(request, 'projects/delete_project.html', context)