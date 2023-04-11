from django.db.models import Q
from .models import Profile, Skill

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

def paginateProfiles(request, profiles, results):
    page = request.GET.get('page')
    paginator = Paginator(profiles, results)
    
    try:
        profiles = paginator.page(page)
    except PageNotAnInteger:
        page = 1
        profiles = paginator.page(page)
    except EmptyPage:
        page = paginator.num_pages

    leftIndex = (int(page) - 2)
    if leftIndex < 1 :
        leftIndex = 1 

    rightIndex = (int(page) + 3)
    if rightIndex > paginator.num_pages :
        rightIndex = paginator.num_pages + 1 

    custom_range = range(leftIndex, rightIndex)



    return custom_range, profiles


def searchProfiles(request):
    search_query = ''

    if request.GET.get('search_query'):
        search_query = request.GET.get('search_query')

    skills = Skill.objects.filter(name__icontains = search_query)

    profiles = Profile.objects.distinct().filter(
                                        Q(name__icontains = search_query) |
                                        Q(shortIntro__icontains = search_query) |
                                        Q(skills__in = skills))

    return profiles, search_query