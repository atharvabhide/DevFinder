from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Profile
from .forms import CustomUserCreationForm

def loginUser(request):
    # gets page name for login_register.html
    page = 'login'
    context = {'page' : page}
    # if user is already logged in, redirect to profiles page
    if request.user.is_authenticated:
        return redirect('profiles')

    if (request.method == 'POST'):
        username = request.POST['username']
        password = request.POST['password']

        try:
            # checks if user exists in database
            user = User.objects.get(username=username)
        except:
            messages.error(request, "Username does not exist!")

        # does user authentication
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('profiles')
        else:
            messages.error(request, "Username or Password is incorrect!")
        
    return render(request, 'users/login_register.html', context)

def logoutUser(request):
    # logs out user
    logout(request)
    messages.success(request, "User has been logged out!")
    return redirect('login')

def registerUser(request):
    # gets page name for login_register.html
    page = 'register'
    form = CustomUserCreationForm()
    if (request.method == 'POST'):
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            # creates user
            user = form.save(commit=False)
            # sets username to lowercase
            user.username = user.username.lower()
            # saves user
            user.save() 
            # send success message
            messages.success(request, "User account was created!")
            # log in the user
            login(request, user)
            return redirect('profiles')
        else:
            messages.error(request, "An error has occured during registration!")
           
    context = {'page' : page, 'form' : form}
    return render(request, 'users/login_register.html', context)

def profiles(request):
    # gets all profiles from database
    profiles = Profile.objects.all()
    context = {"profiles" : profiles}
    return render(request, 'users/profiles.html', context=context)

def userProfile(request, pk):
    # gets particular profile from database
    profile = Profile.objects.get(id=pk)

    topSkills = profile.skills.exclude(description__exact="")
    otherSkills = profile.skills.filter(description="")
    projects = profile.projects.all()

    context = {"profile" : profile, "topSkills" : topSkills, "otherSkills" : otherSkills, "projects" : projects}
    return render(request, 'users/user-profile.html', context=context)

@login_required(login_url='login')
def userAccount(request):

    profile = request.user.profile

    topSkills = profile.skills.exclude(description__exact="")
    otherSkills = profile.skills.filter(description="")
    projects = profile.projects.all()

    context = {'user' : profile, 'topSkills' : topSkills, 'otherSkills' : otherSkills, 'projects' : projects}
    return render(request, 'users/user-account.html', context=context)