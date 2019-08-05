from .home import HomeView
from .search import user_question_tag_search
from .question import (
    GetUpdateQuestionView,
    UpdateQuestionScoreView,
    ListCreateQuestionView,
    ReportQuestionView
)
from .user import GetUpdateUserView, ListUserView
from .tag import ListCreateTagView, GetTagView
from .subscriber import CreateSubscriberView
from .answer import (GetUpdateAnswerView, UpdateAnswerScoreView, AcceptAnswerView, ReportAnswerView, CreateAnswerView)
from .comment import ListCreateCommentView, UpdateCommentScoreView, ReportCommentView
from .auth import GithubLoginView, LoginViewCustom, VerifyEmailViewCustom
from .notification import (
    GetUnreadNotifications,
    # GetAllNotifications,
    MarkAllAsRead,
    MarkAllAsUnread,
) 

__all__ = [
    'HomeView',
    'ListUserView',
    'GetUpdateUserView',
    'ReportQuestionView',
    'ListCreateTagView',
    'GetTagView',
    'user_question_tag_search',
    'GetUpdateQuestionView',
    'UpdateQuestionScoreView',
    'CreateSubscriberView',
    'ListCreateQuestionView',
    'CreateAnswerView',
    'GetUpdateAnswerView',
    'UpdateAnswerScoreView',
    'AcceptAnswerView',
    'ReportAnswerView',
    'ListCreateCommentView',
    'UpdateCommentScoreView',
    'ReportCommentView',
    'LoginViewCustom',
    'VerifyEmailViewCustom',
    'GithubLoginView',
    'GetUnreadNotifications',
    # 'GetAllNotifications',
    'MarkAllAsRead',
    'MarkAllAsUnread',
]