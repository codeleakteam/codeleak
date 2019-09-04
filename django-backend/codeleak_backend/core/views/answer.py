from django.conf import settings
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView, CreateAPIView
from rest_framework.response import Response
from core.models import (
    Answer,
    User,
    Question,
    AnswerReport
)
from rest_framework import status
from core.serializers import (
    AnswerSerializer,
    CreateAnswerSerializer,
    AnswerVoteSerializer,
    AnswerReportSerializer
)
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions
from core.models import AnswerVote
from notifications.signals import notify
import requests

ANSWER_VOTE_VALUE = 20

# Helper that evaluates 'true' to True and does so for false values
def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1")

SAFE_METHODS = ["GET", "OPTIONS", "HEAD"]

class IsQuestionAuthorOrReadOnly(permissions.BasePermission):
    message = 'Accept answer not allowed'
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        print("user", request.user.id)
        print("obj", obj.question.author.id)
        return request.user.id == obj.question.author.id


class CreateAnswerView(CreateAPIView):
    def post(self, request):
        question = request.data.get("question", None)

        # Field checks
        if question == None:
            return Response({ 'message': 'question param not provided'}, status.HTTP_400_BAD_REQUEST)

        try:
            question = Question.objects.get(pk=question)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Question with the ID: ' + question + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            author = User.objects.get(pk=request.user.id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'User with the ID: ' + author + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CreateAnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("Saving answer...")
            answer = Answer.objects.get(pk=serializer.data['id'])
            if answer.question.author.full_name is not None:
                answer_author_display_name = answer.question.author.full_name
            else:
                answer_author_display_name = answer.question.author.username

            notify.send(
                    verb='ADD_ANSWER',
                    action_object=answer,
                    target=answer.question,
                    sender=author,
                    recipient=answer.question.author,
                )
            r = requests.post(
                "https://api.eu.mailgun.net/v3/mg.codeleak.io/messages",
                auth=("api", "c6c3f027296426e477ad7040b5332039-afab6073-ab1946d1"),
                # edit this when registration flow on front is finished
                data={"from": "{} <mailgun@mg.codeleak.io>".format(answer_author_display_name),
                        "to": [question.author.email],
                        "subject": "Re: {}".format(question.title),
                        "template": "answer-comment-inbox-alert",
                        "o:tag": ["inbox"],
                        "v:question_title": question.title,
                        # edit this when registration flow on front is finished
                        "v:author_full_name": answer_author_display_name,
                        "v:foreword": "has just added an answer on your question.",
                        "v:codeleak_question_link": "{}/question/{}/{}".format(settings.FRONT_END_APP_URL,
                                                                               question.id,
                                                                               question.slug
                                                                               ) 
                })
            print("mailgun response", r.text)
            read_serializer = AnswerSerializer(answer)
            return Response(read_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GetUpdateAnswerView(RetrieveUpdateAPIView):
    def get(self, request, answer_id):
        try:
            answer = Answer.objects.get(pk=answer_id)
            serializer = AnswerSerializer(answer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Answer with the ID: ' + answer_id+ ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, answer_id):
        pass

class AcceptAnswerView(APIView):
    permission_classes = (IsQuestionAuthorOrReadOnly, )
    def post(self, request, answer_id):
        try:
            answer = Answer.objects.filter(pk=answer_id).select_related('question')[0]
            if answer.question.has_accepted_answer:
                return Response({'message': 'Question already has an accepted answer'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                self.check_object_permissions(request, answer)
                answer.is_accepted = True
                answer.question.has_accepted_answer = True
                answer.save()
                answer.question.save()
                serializer = AnswerSerializer(answer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Answer with the ID: ' + answer_id+ ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

class ReportAnswerView(APIView):
    def post(self, request, answer_id):
        print("body:", request.data)
        is_report = request.data.get("is_report", None)
        
        if is_report == None:
            return Response({
                'message': 'No is_report param provided'
            }, status=status.HTTP_400_BAD_REQUEST)


        if is_report != 'true' and is_report != 'false':
            return Response({ 'message': 'Invalid is_report param'}, status.HTTP_400_BAD_REQUEST)

        is_report = str2bool(is_report)
        try:
            answer = Answer.objects.get(pk=answer_id)
            answer.reported_times += 1
            answer.save()
            try:
                report = AnswerReport.objects.get(
                    answer=answer_id,
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
                    report_serializer = AnswerReportSerializer(data={
                        'answer': answer_id,
                        'author': request.user.id 
                    })
                    if report_serializer.is_valid():
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
                'message': 'Answer with the ID: ' + answer_id + ' does not exist.'
                },
                status=status.HTTP_404_NOT_FOUND
            )


class UpdateAnswerScoreView(UpdateAPIView):
    def put(self, request, answer_id):
        is_upvote = request.data.get('is_upvote')

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

        # If answer is not found, ObjectDoesNotExist will be caught
        try:
            answer = Answer.objects.get(pk=answer_id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Answer with the ID: ' + answer_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Flags
        is_upvote = str2bool(is_upvote)

        # Vote value(adds up only on answer score)
        vote_value = None
        verb = None

        if is_upvote:
            vote_value = ANSWER_VOTE_VALUE
            verb = 'ANSWER_UPVOTE'
        else:
            vote_value = -ANSWER_VOTE_VALUE
            verb = 'ANSWER_DOWNVOTE'

        try:
            # If AnswerVote already exists we just update val
            answer_vote = AnswerVote.objects.get(author=request.user.id, answer=answer_id)
            print("Answer_vote already exists. ")

            # Case where user might be switching from upvote to downvote
            if answer_vote.is_upvote != is_upvote:
                answer_vote.is_upvote = is_upvote
                answer_vote.save()
                answer_vote_serializer = AnswerVoteSerializer(answer_vote)

                # * 2 because of switch;
                answer.score += vote_value * 2
                answer.save()

                user.reputation += vote_value * 2
                user.save()

                notify.send(
                    verb=verb,
                    action_object=answer_vote,
                    target=answer,
                    sender=request.user,
                    recipient=answer.author,
                    vote_value=vote_value
                )
                serializer = AnswerSerializer(answer)
                return Response({
                    'answer_vote': answer_vote_serializer.data,
                    'answer': serializer.data
                }, status.HTTP_200_OK)
            # If user tries to upvote an already upvoted answer
            else:
                return Response({
                    'message': 'Already voted'
                }, status=status.HTTP_400_BAD_REQUEST)

        # If it does not exist, we create one
        except ObjectDoesNotExist:
            answer_vote = None
            answer_vote_serializer = AnswerVoteSerializer(data={
                'author': request.user.id,
                'answer': answer_id,
                'is_upvote': is_upvote
            })
            if answer_vote_serializer.is_valid():
                print("answer_vote_serializer is valid. saving...")
                answer_vote = answer_vote_serializer.save()
            else:
                print("answer_vote_serializer isn't valid. aborting...")
                return Response(answer_vote_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            answer.score += vote_value
            answer.save()

            user.reputation += vote_value
            user.save()

            notify.send(
                verb=verb,
                action_object=answer_vote,
                target=answer,
                sender=request.user,
                recipient=answer.author,
                vote_value=vote_value
            )
            serializer = AnswerSerializer(answer)
            return Response({
                'answer_vote': answer_vote_serializer.data,
                'answer': serializer.data
            }, status.HTTP_200_OK)