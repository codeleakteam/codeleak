from django.db import models
from rest_framework import serializers
from core.models import Tag


class TagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tag
        fields = "__all__"


class TagSerializerMinimal(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tag
        fields = ["id", "title", "slug"]


class TagIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id"]


class TagCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["title"]

