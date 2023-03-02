from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def projects(request):
    return HttpResponse("<h1>Projects<h1>")

def project(request, pk:int):
    return HttpResponse(f"<h1>Project {pk}</h1>")