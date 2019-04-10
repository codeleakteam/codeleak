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
        return QuestionCommentSerializer(question_obj.question_comment.all(), many=True ).data
        # return [QuestionCommentSerializer(comment).data for comment in question_obj.question_comment.all()]

    class Meta:
        model = Question
        fields = "__all__"

class QuestionCreateUpdateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), read_only=False
    )
    tags = TagCreateUpdateSerializer(many=True)

    def create(self, validated_data):
        # Not writing tags into db, will use different serializer to pull out from db
        tags = validated_data.pop("tags", None)

        if tags is not None:
            for tag in tags:
                fields = {}
                for k, v in tag.items():
                    fields[k] = v
                Tag.objects.get_or_create(
                    title=fields["title"], slug=slugify(fields["title"])
                )
        question = Question.objects.create(**validated_data)
        return question

    class Meta:
        model = Question
        fields = "__all__"

