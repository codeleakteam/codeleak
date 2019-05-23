from django.contrib import admin
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

# Register your models here.
admin.site.register(Tag)
admin.site.register(Question)
admin.site.register(User)
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