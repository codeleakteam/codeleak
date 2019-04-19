from django.db import models
from rest_framework import serializers
from django.template.defaultfilters import slugify
from core.models import Subscriber

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber 
        fields = "__all__"
