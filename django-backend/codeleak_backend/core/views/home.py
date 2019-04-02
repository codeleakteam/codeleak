from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.models import Question
from core.serializers import QuestionSerializer

@api_view(['GET'])
def home_get(request):
       questions = Question.objects.all()
       q_serializer = QuestionSerializer(questions, many=True)
       return JsonResponse(q_serializer.data, safe=False)
