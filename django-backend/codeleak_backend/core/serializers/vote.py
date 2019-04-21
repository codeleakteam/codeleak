from django.db import models
from rest_framework import serializers
from core.models import (QuestionVote, AnswerVote)


class QuestionVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionVote
        fields = "__all__"

class AnswerVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerVote 
        fields = "__all__"



