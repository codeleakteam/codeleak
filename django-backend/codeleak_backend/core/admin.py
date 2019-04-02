from django.contrib import admin
from core.models import Tag, Question, User, Editor

# Register your models here.
admin.site.register(Tag)
admin.site.register(Question)
admin.site.register(User)
admin.site.register(Editor)