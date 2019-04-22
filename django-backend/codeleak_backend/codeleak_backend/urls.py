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
from core.views import (
    HomeView,
    ListCreateQuestionView,
    UpdateQuestionView,
    user_question_tag_search,
    ListUserView,
    GetUpdateUserView,
    GetQuestionView,
    ListCreateTagView,
    GetTagView,
    UpdateQuestionScoreView,
    CreateSubscriberView,
    GetUpdateAnswerView,
    UpdateAnswerScoreView,
    AcceptAnswer,
    ListCreateCommentView,
    UpdateCommentScoreView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/users$', ListUserView.as_view()),
    url(r'^api/users/(?P<user_id>[0-9]+)$', GetUpdateUserView.as_view()),
    path('api/home', HomeView.as_view()),
    path('api/subscribe',CreateSubscriberView.as_view()),
    path('api/questions', ListCreateQuestionView.as_view()),
    url(r'^api/questions/(?P<question_id>[0-9]+)$', GetQuestionView.as_view()),
    url(r'^api/questions/(?P<question_id>[0-9]+)$', UpdateQuestionView.as_view()),
    url(r'^api/questions/(?P<question_id>[0-9]+)/vote$', UpdateQuestionScoreView.as_view()),
    url(r'^api/answers/(?P<answer_id>[0-9]+)$', GetUpdateAnswerView.as_view()),
    url(r'^api/answers/(?P<answer_id>[0-9]+)/vote$', UpdateAnswerScoreView.as_view()),
    url(r'^api/answers/(?P<answer_id>[0-9]+)/accept$', AcceptAnswer.as_view()),
    url(r'^api/comments/$', ListCreateCommentView.as_view()),
    url(r'^api/comments/(?P<comment_id>[0-9]+)/vote$', UpdateCommentScoreView.as_view()),
    path('api/tags', ListCreateTagView.as_view()),
    url(r'^api/tags/(?P<tag_id>[0-9]+)$', GetTagView.as_view()),
    path('api/search', user_question_tag_search),
    url(r'^api-auth/', include('rest_framework.urls'))
]
