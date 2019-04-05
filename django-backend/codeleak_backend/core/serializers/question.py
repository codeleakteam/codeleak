from django.db import models
from rest_framework import serializers
from django.template.defaultfilters import slugify
from core.models import Question, User, Tag
from .user import UserSerializerMinimal
from .tag import TagSerializerMinimal, TagCreateUpdateSerializer


class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializerMinimal()
    tags = TagSerializerMinimal(many=True)

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

