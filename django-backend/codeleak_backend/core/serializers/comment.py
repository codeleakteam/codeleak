
from django.db import models
from rest_framework import serializers
from django.template.defaultfilters import slugify
from core.models import QuestionComment, AnswerComment
from .user import UserSerializerMinimal

class QuestionCommentSerializer(serializers.ModelSerializer):
    author = UserSerializerMinimal()
    class Meta:
        model = QuestionComment
        fields = "__all__"

class AnswerCommentSerializer(serializers.ModelSerializer):
    author = UserSerializerMinimal()
    class Meta:
        model = AnswerComment
        fields = "__all__"
