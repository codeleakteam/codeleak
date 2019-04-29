from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, RetrieveAPIView, ListCreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from core.models import Question, Tag, QuestionComment, Answer, AnswerComment, QuestionVote, User
from core.serializers import QuestionSerializer, QuestionCommentSerializer, QuestionCreateUpdateSerializer, AnswerSerializer, AnswerCommentSerializer, QuestionVoteSerializer

# Upvoting question means +20 on its score, and downvoting means -20
QUESTION_VOTE_VALUE = 20

# Helper that evaluates 'true' to True and does so for false values
def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1")

class GetQuestionView(RetrieveAPIView):
    def get(self, request, question_id):
        try:
            question = Question.objects.filter(pk=question_id).prefetch_related('question_answer', 'question_comment')[0]
            serializer = QuestionSerializer(question)
            return Response({
                'question': serializer.data,
            }, status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Question with the ID: ' + question_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

class ListCreateQuestionView(ListCreateAPIView):
    def get(self,request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response({
                'questions': serializer.data,
        }, status.HTTP_200_OK)

    def post(self, request):
        print("Create question data: ", request.data)
        tags = request.data.get("tags", None)
        serializer = QuestionCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            for t in tags:
                try:
                    tag = Tag.objects.get(pk=t.get('id', None))
                    tag.used_times += 1
                    tag.save()
                    print("tag used times: ", tag.used_times)
                except ObjectDoesNotExist:
                    return Response({ 'message': 'Tag with the ID: ' + t.id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)
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

# upvote answer 20
# downvote answer -10
# accept answer 50
# upvote comment 20
# downvote comment -5
# upvote question 20

class UpdateQuestionScoreView(UpdateAPIView):
    def put(self, request, question_id):
        is_upvote = request.data.get('is_upvote', None)
        user_id = request.data.get('user_id', None)

        # Field checks
        if is_upvote == None:
            return Response({ 'message': 'is_upvote param not provided'}, status.HTTP_400_BAD_REQUEST)

        if user_id == None:
            return Response({ 'message': 'user_id value param not provided'}, status.HTTP_400_BAD_REQUEST)

        if is_upvote != 'true' and is_upvote != 'false':
            return Response({ 'message': 'Invalid is_upvote param'}, status.HTTP_400_BAD_REQUEST)

        # If user is not found, ObjectDoesNotExist will be caught
        try:
            user = User.objects.get(pk=user_id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'User with the ID: ' + user_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # If question is not found, ObjectDoesNotExist will be caught
        try:
            question = Question.objects.get(pk=question_id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Question with the ID: ' + question_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Flags
        is_upvote = str2bool(is_upvote)

        # Vote value(adds up only on answer score)
        vote_value = None
        if is_upvote:
            vote_value = QUESTION_VOTE_VALUE
        else:
            vote_value = -QUESTION_VOTE_VALUE

        try:
            # If QuestionVote already exists we just update val
            question_vote = QuestionVote.objects.get(author=user_id, question=question_id)
            print("Question_vote already exists. ")

            # Case where user might be switching from upvote to downvote
            if question_vote.is_upvote != is_upvote:
                question_vote.is_upvote = is_upvote
                question_vote.save()
                question_vote_serializer = QuestionVoteSerializer(question_vote)

                # * 2 because of switch;
                question.score += vote_value * 2
                question.save()

                user.reputation += vote_value * 2
                user.save()

                serializer = QuestionSerializer(question)
                return Response({
                    'question_vote': question_vote_serializer.data,
                    'question': serializer.data
                }, status.HTTP_200_OK)
            # If user tries to upvote an already upvoted answer
            else:
                return Response({
                    'message': 'You can only vote once in the same direction'
                }, status=status.HTTP_400_BAD_REQUEST)

        # If it does not exist, we create one
        except ObjectDoesNotExist:
            question_vote_serializer = QuestionVoteSerializer(data={
                'author': user_id,
                'question': question_id,
                'is_upvote': is_upvote
            })
            if question_vote_serializer.is_valid():
                print("question_vote_serializer is valid. saving...")
                question_vote_serializer.save()
            else:
                print("question_vote_serializer isn't valid. aborting...")
                return Response(question_vote_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            question.score += vote_value
            question.save()

            user.reputation += vote_value
            user.save()

            serializer = QuestionSerializer(question)
            return Response({
                'question_vote': question_vote_serializer.data,
                'question': serializer.data
            }, status.HTTP_200_OK)

class ReportQuestionView(APIView):
    def post(self, request, question_id):
        try:
            question = Question.objects.get(pk=question_id)
            question.reported_times += 1
            question.save()
            serializer = QuestionSerializer(question)
            return Response({
                'question': serializer.data,
            }, status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Question with the ID: ' + question_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)



