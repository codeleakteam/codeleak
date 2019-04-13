from django.http import JsonResponse
from rest_framework.generics import UpdateAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Question, QuestionComment, Answer, AnswerComment
from core.serializers import QuestionSerializer, QuestionCommentSerializer, QuestionCreateUpdateSerializer, AnswerSerializer, AnswerCommentSerializer

class GetQuestionView(RetrieveAPIView):
    def get(self, request, question_id):
        print("KVESCN ID: ", question_id)
        # Get question
        question = Question.objects.filter(pk=question_id).prefetch_related('question_answer', 'question_comment')[0]
        serializer = QuestionSerializer(question)
        print("DATA: ", serializer.data)

        # Get question comments
        # question_comments = QuestionComment.objects.filter(question=question_id)[:5]
        # question_comment_serializer = QuestionCommentSerializer(question_comments, many=True)

        # Get question answers
        # answers = Answer.objects.filter(question=question_id).prefetch_related('answer_comment')
        # answer_serializer = AnswerSerializer(answers, many=True)

        # [answer_id]: [answer_queryset]
        # answer_comments = {}

        # Goingto be dispatched through JSON
        # serialized_answer_comments = {}

        # Get answer comments
        # for a in answers:
        #     print("AJDI", a.id)
        #     answer_comments[a.id] = AnswerComment.objects.filter(answer=a.id)
        #     answer_comments[str(a.id) + '_count'] = AnswerComment.objects.filter(answer=a.id).count()

        # print("ANSWER_COMMENTS: ", answer_comments)

        # Serialize answer comments
        # for k,v in answer_comments.items():
        #     if "_count" in str(k):
        #         continue

        #     if answer_comments[str(k) + "_count"] == 0:
        #         continue

        #     print("There are comments for this answer. Serializing...")
        #     serialized_answer_comments[k] = AnswerCommentSerializer(v, many=True).data

        return Response({
            'question': serializer.data,
            # 'question_comments': question_comment_serializer.data,
            # 'answers': answer_serializer.data,
            # 'answer_comments': serialized_answer_comments
        }, status.HTTP_200_OK)
        w

class CreateQuestionView(CreateAPIView):
    def post(self, request):
        print("Create question data: ", request.data)
        serializer = QuestionCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

