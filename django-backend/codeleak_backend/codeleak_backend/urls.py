"""codeleak_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from core.views import HomeView, CreateQuestionView, UpdateQuestionView, user_question_tag_search, UpdateUserView, GetQuestionView

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/users/(?P<user_id>[0-9]+)$', UpdateUserView.as_view()),
    path('api/home', HomeView.as_view()),
    path('api/questions', CreateQuestionView.as_view()),
    url(r'^api/questions/(?P<question_id>[0-9]+)$', GetQuestionView.as_view()),
    url(r'^api/questions/(?P<question_id>[0-9]+)$', UpdateQuestionView.as_view()),
    path('api/search', user_question_tag_search),
    url(r'^api-auth/', include('rest_framework.urls'))
]
