from django.db import models
from rest_framework import serializers
from core.models import (QuestionVote, AnswerVote, AnswerCommentVote, QuestionCommentVote)


class QuestionVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionVote
        fields = "__all__"

class AnswerVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerVote 
        fields = "__all__"

class QuestionCommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionCommentVote 
        fields = "__all__"

class AnswerCommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerCommentVote 
        fields = "__all__"






