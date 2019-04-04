from django.db import models
from rest_framework import serializers
from core.models import User

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = '__all__'

class UserSerializerMinimal(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = '__all__'
        # fields = ['id', 'full_name', 'username', 'avatar']