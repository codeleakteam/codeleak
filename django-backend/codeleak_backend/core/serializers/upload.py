from django.db import models
from rest_framework import serializers
from core.models import Upload 


class UploadSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False)

    class Meta:
        model = Upload
        fields = "__all__"


