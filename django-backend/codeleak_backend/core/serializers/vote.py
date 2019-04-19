from django.db import models
from rest_framework import serializers
from core.models import QuestionVote 


class QuestionVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionVote
        fields = "__all__"
