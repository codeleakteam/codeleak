from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from core.models import (
    Tag,
    Question,
    Answer,
    QuestionComment,
    AnswerComment,
    User,
    Editor,
    Subscriber,
    AnswerVote,
    QuestionVote,
    AnswerCommentVote,
    QuestionReport,
    QuestionCommentReport,
    AnswerReport,
    AnswerCommentReport
)


UserAdmin.fieldsets += ('Custom fields set', 
    {'fields': 
        (
            'cv_url',
            'website_url',
            'github_username',
            'full_name',
            'twitter_username',
            'avatar',
            'gender',
            'company',
            'company_headquarters',
            'role_in_company',
            'biography',
            'location',
            'birth',
            'student',
            'verified',
            'looking_for_job',
            'reputation',
            'reported_times',
            'created_at',
        )
    }
),

# Register your models here.
admin.site.register(Tag)
admin.site.register(Question)
admin.site.register(User, UserAdmin)
admin.site.register(Editor)
admin.site.register(Answer)
admin.site.register(QuestionComment)
admin.site.register(AnswerComment)
admin.site.register(Subscriber)

# Votes
admin.site.register(AnswerVote)
admin.site.register(QuestionVote)
admin.site.register(AnswerCommentVote)

# Reports
admin.site.register(QuestionReport)
admin.site.register(QuestionCommentReport)
admin.site.register(AnswerReport)
admin.site.register(AnswerCommentReport)