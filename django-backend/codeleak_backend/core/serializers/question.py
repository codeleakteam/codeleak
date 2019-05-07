from django.db import models
from rest_framework import serializers
from django.template.defaultfilters import slugify
from core.models import Question, User, Tag
from .user import UserSerializerMinimal
from .tag import TagSerializerMinimal, TagCreateUpdateSerializer
from .comment import QuestionCommentSerializer
from .answer import AnswerSerializer

class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializerMinimal()
    tags = TagSerializerMinimal(many=True)
    comments = serializers.SerializerMethodField()
    answers = serializers.SerializerMethodField()

    def get_answers(self, question_obj):
        return AnswerSerializer(question_obj.question_answer.all(), many=True).data
        # return [AnswerSerializer(answer).data for answer in question_obj.question_answer.all()]
    def get_comments(self, question_obj):
        return QuestionCommentSerializer(question_obj.question_comment.all(), many=True).data
        # return [QuestionCommentSerializer(comment).data for comment in question_obj.question_comment.all()]

    class Meta:
        model = Question
        fields = "__all__"

class QuestionCreateUpdateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), read_only=False
    )
    # tags = TagCreateUpdateSerializer(many=True)

    def create(self, validated_data):
        title = validated_data.get('title', None)
        tags = validated_data.pop('tags', None)

        validated_data['slug'] = slugify(title)

        question = Question(**validated_data)
        question.save()

        question.tags.set(tags)
        question.save()
        return question

    class Meta:
        model = Question
        fields = "__all__"

