from django.db import models
from rest_framework import serializers
from core.models import User

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    questions = serializers.SerializerMethodField()
    answers = serializers.SerializerMethodField()

    def get_questions(self, user_obj):
        from .question import QuestionSerializer
        return QuestionSerializer(user_obj.question_author.all(), many=True).data

    def get_answers(self, user_obj):
        print("USER_OBJ", user_obj)
        from .answer import AnswerSerializer
        return AnswerSerializer(user_obj.answer_author.all(), many=True).data

    class Meta:
        model = User
        fields = '__all__'

class UserSerializerMinimal(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'avatar']