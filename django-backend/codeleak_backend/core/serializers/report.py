from django.db import models
from rest_framework import serializers
from core.models import (
    QuestionVote,
    AnswerVote,
    AnswerCommentVote,
    QuestionCommentVote,
    QuestionReport,
    QuestionCommentReport,
    AnswerReport,
    AnswerCommentReport
)

class QuestionReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionReport 
        fields = "__all__"

class QuestionCommentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionCommentReport
        fields = "__all__"

class AnswerReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerReport 
        fields = "__all__"

class AnswerCommentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerCommentReport
        fields = "__all__"






