from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Question
from core.serializers import QuestionSerializer, QuestionCreateUpdateSerializer


class CreateQuestionView(APIView):
    def post(self, request):
        print("Create question data: ", request.data)
        serializer = QuestionCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        return Response({"no_cock_orientation": True})

class UpdateQuestionView(UpdateAPIView):
    def put(self, request, question_id):
        print("Update quesiton data: ", request.data)
        print("Update question id: ", question_id)
        question = Question.objects.get(pk=question_id)
        serializer = QuestionCreateUpdateSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

