from django.db import models
from rest_framework import serializers
from core.models import (
    User,
    Question,
    Answer,
)


class UserSerializerMinimal(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'avatar', 'reputation']

class UserQuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializerMinimal()

    class Meta:
        model = Question
        fields = [
            'id',
            'title',
            'score',
            'author',
            'tags',
            'has_accepted_answer',
            'has_comments',
        ]
    
class UserAnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    question = UserQuestionSerializer()
    
    class Meta:
        model = Answer
        fields = [
            'id',
            'question',
            'has_comments',
            'score',
        ]


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    questions = serializers.SerializerMethodField()
    answers = serializers.SerializerMethodField()

    def get_questions(self, user_obj):
        return UserQuestionSerializer(user_obj.question_author.all(), many=True).data

    def get_answers(self, user_obj):
        return UserAnswerSerializer(user_obj.answer_author.all(), many=True).data

    class Meta:
        model = User
        exclude = [
            'password',
            'is_superuser',
            'is_staff',
            'is_active',
            'user_permissions',
            'groups'
        ]


class UpdateUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(read_only=True)
    reputation = serializers.IntegerField(read_only=True)
    reported_times = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)
    date_joined = serializers.DateTimeField(read_only=True)
    class Meta:
        model = User
        exclude = [
            'password',
            'is_superuser',
            'is_staff',
            'is_active',
            'user_permissions',
            'groups'
        ] 




