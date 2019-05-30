
from django.db import models
from rest_framework import serializers
from django.template.defaultfilters import slugify
from core.models import User, QuestionComment, AnswerComment
from .user import UserSerializerMinimal

class CreateQuestionCommentSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), read_only=False
    )
    class Meta:
        model = QuestionComment
        fields = "__all__"

class CreateAnswerCommentSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), read_only=False
    )
    class Meta:
        model = AnswerComment
        fields = "__all__"

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
