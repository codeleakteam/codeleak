import logging
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import (
    UpdateAPIView,
    RetrieveAPIView,
    ListCreateAPIView,
    UpdateAPIView,
    RetrieveUpdateAPIView
) 
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from core.models import (
    Question,
    Tag,
    QuestionComment,
    Answer,
    AnswerComment,
    QuestionVote,
    User,
    QuestionReport
)
from core.serializers import (
    QuestionSerializer,
    QuestionCommentSerializer,
    QuestionCreateUpdateSerializer,
    AnswerSerializer,
    AnswerCommentSerializer,
    QuestionVoteSerializer,
    QuestionReportSerializer
)
from rest_framework import permissions
from notifications.signals import notify

logger = logging.getLogger()

# Upvoting question means +20 on its score, and downvoting means -20
QUESTION_VOTE_VALUE = 20

# Helper that evaluates 'true' to True and does so for false values
def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1")

SAFE_METHODS = ["GET", "OPTIONS", "HEAD"]

class IsAuthorOrReadOnly(permissions.BasePermission):
    message = 'Question edit not allowed'
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.id == obj.author.id


# list questions is used for dev only
# question fetching on home page is done on /home endpoint
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
        if tags is None:
            return Response({
                'message': 'No tags provided'
            }, status=status.HTTP_400_BAD_REQUEST)

        for t_id in tags:
            serializer = QuestionCreateUpdateSerializer(data=request.data)
            if serializer.is_valid():
                try:
                    tag = Tag.objects.get(pk=t_id)
                    tag.used_times += 1
                    tag.save()
                    print("tag used times: ", tag.used_times)
                except ObjectDoesNotExist:
                    return Response({ 'message': 'Tag with the ID: ' + str(t_id) + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)
                serializer.save()
                return Response({
                   'question': serializer.data 
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUpdateQuestionView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthorOrReadOnly, )

    def get(self, request, question_id):
        try:
            question = Question.objects.filter(pk=question_id).prefetch_related('question_answer', 'question_comment')[0]
            question.viewed_times += 1
            question.save()
            serializer = QuestionSerializer(question)
            return Response({
                'question': serializer.data,
            }, status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Question with the ID: ' + question_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, question_id):
        print("Update quesiton data: ", request.data)
        print("Update question id: ", question_id)
        question = Question.objects.get(pk=question_id)
        self.check_object_permissions(request, question)
        serializer = QuestionCreateUpdateSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateQuestionScoreView(UpdateAPIView):
    def put(self, request, question_id):
        is_upvote = request.data.get('is_upvote', None)

        # Field checks
        if is_upvote == None:
            return Response({ 'message': 'is_upvote param not provided'}, status.HTTP_400_BAD_REQUEST)

        if is_upvote != 'true' and is_upvote != 'false':
            return Response({ 'message': 'Invalid is_upvote param'}, status.HTTP_400_BAD_REQUEST)

        # If user is not found, ObjectDoesNotExist will be caught
        try:
            user = User.objects.get(pk=request.user.id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'User with the ID: ' + request.user.id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # If question is not found, ObjectDoesNotExist will be caught
        try:
            question = Question.objects.get(pk=question_id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Question with the ID: ' + question_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Flags
        is_upvote = str2bool(is_upvote)

        # Vote value(adds up only on answer score)
        vote_value = None
        verb = None

        if is_upvote:
            vote_value = QUESTION_VOTE_VALUE
            verb = 'QUESTION_UPVOTE'
        else:
            vote_value = -QUESTION_VOTE_VALUE
            verb = 'QUESTION_DOWNVOTE'

        try:
            # If QuestionVote already exists we just update val
            question_vote = QuestionVote.objects.get(author=request.user.id, question=question_id)
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

                notify.send(
                    verb=verb,
                    action_object=question_vote,
                    target=question,
                    sender=request.user,
                    recipient=question.author,
                    vote_value=vote_value
                )

                serializer = QuestionSerializer(question)
                return Response({
                    'question_vote': question_vote_serializer.data,
                    'question': serializer.data
                }, status.HTTP_200_OK)
            # If user tries to upvote an already upvoted answer
            else:
                return Response({
                    'message': 'Already voted'
                }, status=status.HTTP_400_BAD_REQUEST)

        # If it does not exist, we create one
        except ObjectDoesNotExist:
            question_vote = None
            question_vote_serializer = QuestionVoteSerializer(data={
                'author': request.user.id,
                'question': question_id,
                'is_upvote': is_upvote
            })
            if question_vote_serializer.is_valid():
                print("question_vote_serializer is valid. saving...")
                question_vote = question_vote_serializer.save()
            else:
                print("question_vote_serializer isn't valid. aborting...")
                return Response(question_vote_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            question.score += vote_value
            question.save()

            user.reputation += vote_value
            user.save()

            notify.send(
                verb=verb,
                action_object=question_vote,
                target=question,
                sender=request.user,
                recipient=question.author,
                vote_value=vote_value
            )
            serializer = QuestionSerializer(question)
            return Response({
                'question_vote': question_vote_serializer.data,
                'question': serializer.data
            }, status.HTTP_200_OK)

class ReportQuestionView(APIView):
    def post(self, request, question_id):
        print("body:", request.data)
        is_report = request.data.get("is_report", None)

        try:
            if is_report == None:
                return Response({
                    'message': 'No is_report param provided'
                }, status=status.HTTP_400_BAD_REQUEST)


            if is_report != 'true' and is_report != 'false':
                return Response({ 'message': 'Invalid is_report param'}, status.HTTP_400_BAD_REQUEST)

            is_report = str2bool(is_report)

            question = Question.objects.get(pk=question_id)
            question.reported_times += 1
            question.save()
            try:
                report = QuestionReport.objects.get(
                    question=question_id,
                    author=request.user.id
                )
                if is_report:
                    return Response({
                        'message': 'Already reported'
                    }, status=status.HTTP_400_BAD_REQUEST)
                else:
                    print("Report object deleted")
                    report.delete()
                    return Response({
                        'message': 'Report deleted',
                    }, status.HTTP_200_OK)
            except ObjectDoesNotExist:
                if is_report:
                    print("Report object does not exist. Will create one")
                    report_serializer = QuestionReportSerializer(data={
                        'question': question_id,
                        'author': request.user.id
                    })
                    if report_serializer .is_valid():
                        report_serializer.save()
                        print("Question report successfully saved")
                        return Response(
                            report_serializer.data,
                            status=status.HTTP_201_CREATED
                        )
                    return Response(
                        report_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST
                    )
                return Response({
                    'message': 'Cant delete report which does not exist'
                }, status=status.HTTP_400_BAD_REQUEST)


            return Response({
                'report': report_serializer.data
            }, status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({
                'message': 'Question with the ID: ' + question_id + ' does not exist.'
                },
                status=status.HTTP_404_NOT_FOUND
            )



