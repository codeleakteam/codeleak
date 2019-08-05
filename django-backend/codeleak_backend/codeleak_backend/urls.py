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
from django.views.decorators.csrf import csrf_exempt
from rest_framework_jwt.views import refresh_jwt_token
from core.views import (
    HomeView,
    ListCreateQuestionView,
    ReportQuestionView,
    user_question_tag_search,
    ListUserView,
    GetUpdateUserView,
    GetUpdateQuestionView,
    ListCreateTagView,
    GetTagView,
    UpdateQuestionScoreView,
    CreateSubscriberView,
    GetUpdateAnswerView,
    UpdateAnswerScoreView,
    AcceptAnswerView,
    ReportAnswerView,
    ListCreateCommentView,
    UpdateCommentScoreView,
    ReportCommentView,
    CreateAnswerView,
    LoginViewCustom,
    GithubLoginView,
    VerifyEmailViewCustom,
    GetUnreadNotifications,
    # GetAllNotifications,
    MarkAllAsRead,
    MarkAllAsUnread 
)
import notifications.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^rest-auth/login', LoginViewCustom.as_view(), name='rest_login'),
    url(r'^rest-auth/refresh', refresh_jwt_token),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/verify-email/$', csrf_exempt(VerifyEmailViewCustom.as_view()), name='rest_verify'),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/github/$', GithubLoginView.as_view(), name='github_login'),
    url(r'^api/users$', ListUserView.as_view()),
    url(r'^api/users/(?P<user_id>[0-9]+)$', GetUpdateUserView.as_view()),
    path('api/home', HomeView.as_view()),
    path('api/subscribe',CreateSubscriberView.as_view()),
    path('api/questions', ListCreateQuestionView.as_view()),
    url(r'^api/questions/(?P<question_id>[0-9]+)$', GetUpdateQuestionView.as_view()),
    url(r'^api/questions/(?P<question_id>[0-9]+)/vote$', UpdateQuestionScoreView.as_view()),
    url(r'^api/questions/(?P<question_id>[0-9]+)/report$', ReportQuestionView.as_view()),
    path('api/answers', CreateAnswerView.as_view()),
    url(r'^api/answers/(?P<answer_id>[0-9]+)$', GetUpdateAnswerView.as_view()),
    url(r'^api/answers/(?P<answer_id>[0-9]+)/vote$', UpdateAnswerScoreView.as_view()),
    url(r'^api/answers/(?P<answer_id>[0-9]+)/accept$', AcceptAnswerView.as_view()),
    url(r'^api/answers/(?P<answer_id>[0-9]+)/report$', ReportAnswerView.as_view()),
    url(r'^api/comments$', ListCreateCommentView.as_view()),
    url(r'^api/comments/(?P<comment_id>[0-9]+)/vote$', UpdateCommentScoreView.as_view()),
    url(r'^api/comments/(?P<comment_id>[0-9]+)/report$', ReportCommentView.as_view()),
    path('api/tags', ListCreateTagView.as_view()),
    url(r'^api/tags/(?P<tag_id>[0-9]+)$', GetTagView.as_view()),
    path('api/search', user_question_tag_search),
    url(r'^api/notifications/(?P<user_id>[0-9]+)/unread$', GetUnreadNotifications.as_view()),
    # url(r'^api/notifications/(?P<user_id>[0-9]+)/all$', GetAllNotifications.as_view()),
    url(r'^api/notifications/(?P<user_id>[0-9]+)/mark_all_as_read$', MarkAllAsRead.as_view()),
    url(r'^api/notifications/(?P<user_id>[0-9]+)/mark_all_as_unread$', MarkAllAsUnread.as_view()),
    url('^inbox/notifications/', include(notifications.urls, namespace='notifications')),
]
