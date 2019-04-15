from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from core.models import User
from core.serializers import QuestionSerializer

# upvote answer 20
# downvote answer -10
# accept answer 50
# upvote comment 20
# downvote comment -5
# upvote question 20

class CreateReputationScoreTransaction(CreateAPIView):
    def post(self, request):
        entity_type = request.data['entity_type']
        entity_id = request.data['entity_id']
        is_upvote = request.data['is_upvote'].lower()

        print("CreateReputationScoreTransaction: ", request.data)

        if is_upvote is not 'true' and is_upvote is not 'false':
            return Response({ 'message': 'Invalid upvote parameter '}, HTTP_400_BAD_REQUEST)

        if is_upvote is 'true':
            is_upvote = True
        else:
            is_upvote = False

        if entity_type is 'question':
            if is_upvote:
                amount = 20
            else:
                amount = -20
            try:
                question = Question.objects.get(pk=entity_id)
                question.score = question.score + amount
                question.save()
                serializer = QuestionSerialier(question)
                return Response(serialiezr.data, status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({ 'message': 'Question with ID: ' + entity_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)
            except as err:
                print("[CreateReputationScoreTransaction.post] Something went wrong. Error: ", err)
                return Response({ 'message': 'Internal server error', 'error': str(err) }, status=status.HTTP_404_NOT_FOUND)

