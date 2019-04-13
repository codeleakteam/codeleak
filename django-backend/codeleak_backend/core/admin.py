from django.contrib import admin
from core.models import Tag, Question, Answer, QuestionComment, AnswerComment, User, Editor

# Register your models here.
admin.site.register(Tag)
admin.site.register(Question)
admin.site.register(User)
admin.site.register(Editor)
admin.site.register(Answer)
admin.site.register(QuestionComment)
admin.site.register(AnswerComment)