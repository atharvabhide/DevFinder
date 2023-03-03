from django.shortcuts import render
from django.http import HttpResponse

projectsList = [
    {
        'id': '1',
        'title': 'Ecommerce Website',
        'description': 'Fully functional ecommerce website'
    },
    {
        'id': '2',
        'title': 'Portfolio Website',
        'description': 'A personal website to write articles and display work'
    },
    {
        'id': '3',
        'title': 'Social Network',
        'description': 'An open source project built by the community'
    }
]

# Create your views here.
def projects(request):
    page = "projects"
    number = 10
    context = {'page' : page, 'number' : number, 'projects' : projectsList}
    return render(request, 'projects/projects.html', context)

def project(request, pk):
    project = None
    for i in (projectsList):
        if (int(i['id']) == pk):
            project = i
    if (project != None):
        context = {'project' : project}
        return render(request, 'projects/single-project.html', context)
    else:
        return HttpResponse("Project not found!")