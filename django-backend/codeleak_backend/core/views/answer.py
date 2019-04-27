from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.response import Response
from core.models import Answer, User
from rest_framework import status
from core.serializers import AnswerSerializer, AnswerVoteSerializer
from django.core.exceptions import ObjectDoesNotExist 
from core.models import AnswerVote

ANSWER_VOTE_VALUE = 20

# Helper that evaluates 'true' to True and does so for false values
def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1")
  
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
    def post(self, request, answer_id):
        # TODO: Only question author can accept answer
        user_id = request.data.get("user_id", None)

        # Field checks
        if user_id == None:
            return Response({ 'message': 'user_id param not provided'}, status.HTTP_400_BAD_REQUEST)

        try:
            answer = Answer.objects.filter(pk=answer_id).select_related('question')[0]
            if answer.question.has_accepted_answer:
                return Response({'message': 'Question already has an accepted answer'}, status=status.HTTP_400_BAD_REQUEST)
            else:
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
        try:
            answer = Answer.objects.get(pk=answer_id)
            answer.reported_times += 1
            answer.save()
            serializer = AnswerSerializer(answer)
            return Response({
                'answer': serializer.data,
            }, status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Answer with the ID: ' + question_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)


class UpdateAnswerScoreView(UpdateAPIView):
    def put(self, request, answer_id):
        is_upvote = request.data.get('is_upvote')
        user_id = request.data.get('user_id')

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

        # If answer is not found, ObjectDoesNotExist will be caught 
        try:
            answer = Answer.objects.get(pk=answer_id) 
        except ObjectDoesNotExist:
            return Response({ 'message': 'Answer with the ID: ' + answer_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Flags
        is_upvote = str2bool(is_upvote)

        # Vote value(adds up only on answer score)
        vote_value = None
        if is_upvote:
            vote_value = ANSWER_VOTE_VALUE
        else:
            vote_value = -ANSWER_VOTE_VALUE

        try:
            # If AnswerVote already exists we just update val
            answer_vote = AnswerVote.objects.get(author=user_id, answer=answer_id)
            print("Answer_vote already exists. ")

            # Case where user might be switching from upvote to downvote
            if answer_vote.is_upvote != is_upvote:
                answer_vote.is_upvote = is_upvote
                answer_vote.save()
                answer_vote_serializer = AnswerVoteSerializer(answer_vote)

                # * 2 because of switch; 
                answer.score += vote_value * 2
                answer.save()
                serializer = AnswerSerializer(answer)
                return Response({
                    'answer_vote': answer_vote_serializer.data,
                    'answer': serializer.data
                }, status.HTTP_200_OK)
            # If user tries to upvote an already upvoted answer
            else:
                return Response({
                    'message': 'You can only vote once in the same direction'
                }, status=status.HTTP_400_BAD_REQUEST) 

        # If it does not exist, we create one 
        except ObjectDoesNotExist:
            answer_vote_serializer = AnswerVoteSerializer(data={
                'author': user_id,
                'answer': answer_id,
                'is_upvote': is_upvote
            })
            if answer_vote_serializer.is_valid():
                print("answer_vote_serializer is valid. saving...")
                answer_vote_serializer.save()
            else:
                print("answer_vote_serializer isn't valid. aborting...") 
                return Response(answer_vote_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

            answer.score += vote_value
            answer.save()
            serializer = AnswerSerializer(answer)
            return Response({
                'answer_vote': answer_vote_serializer.data,
                'answer': serializer.data
            }, status.HTTP_200_OK)