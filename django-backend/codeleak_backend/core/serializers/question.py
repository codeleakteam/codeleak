from django.db import models
from rest_framework import serializers
from core.models import Question, User
from .user import UserSerializerMinimal
from .tag import TagSerializerMinimal

class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializerMinimal()
    tags = TagSerializerMinimal(many=True)
    class Meta:
        model = Question
        fields = '__all__'
