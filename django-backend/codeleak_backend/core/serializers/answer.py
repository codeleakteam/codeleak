from django.db import models
from rest_framework import serializers
from django.template.defaultfilters import slugify
from core.models import Question, User, Tag, Answer
from .user import UserSerializerMinimal
from .tag import TagSerializerMinimal, TagCreateUpdateSerializer
from .comment import AnswerCommentSerializer

class AnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializerMinimal()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        fields = "__all__"

    def get_comments(self, answer_obj):
        return [AnswerCommentSerializer(comment).data for comment in answer_obj.answer_comment.all()]

class CreateAnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), read_only=False
    )

    class Meta:
        model = Answer
        fields = "__all__"


