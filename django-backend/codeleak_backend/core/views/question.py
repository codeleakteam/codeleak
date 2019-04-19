from django.http import JsonResponse
from rest_framework.generics import UpdateAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist 
from core.models import Question, QuestionComment, Answer, AnswerComment, QuestionVote, User
from core.serializers import QuestionSerializer, QuestionCommentSerializer, QuestionCreateUpdateSerializer, AnswerSerializer, AnswerCommentSerializer, QuestionVoteSerializer

# Upvoting question means +20 on its score, and downvoting means -20
QUESTION_VOTE_VALUE = 20

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

# upvote answer 20
# downvote answer -10
# accept answer 50
# upvote comment 20
# downvote comment -5
# upvote question 20

class UpdateQuestionScoreView(UpdateAPIView):
    def put(self, request, question_id):
        print("AE", request.data.get("user_id"))
        vote_value = request.data.get('vote_value')
        user_id = request.data.get('user_id')
        user_vote_value_has_changed = True 
        print("CreateReputationScoreTransaction: ", request.data.get('vote_value'))
        print("upvote value: ", vote_value)

        if vote_value == None:
            return Response({ 'message': 'Vote value param not provided'}, status.HTTP_400_BAD_REQUEST)

        if user_id == None:
            return Response({ 'message': 'user_id value param not provided'}, status.HTTP_400_BAD_REQUEST)

        try:
            vote_value = int(vote_value)
            user_id = int(user_id)
        except ValueError:
           return Response({ 'message': 'Invalid parameters'}, status.HTTP_400_BAD_REQUEST) 
            
        # Required body data 
        if vote_value != 0 and vote_value != QUESTION_VOTE_VALUE and vote_value != -QUESTION_VOTE_VALUE:
            return Response({ 'message': 'Invalid vote parameter '}, status.HTTP_400_BAD_REQUEST)
        try:
            # Make sure user exists
            user = User.objects.get(pk=user_id)
            question_vote_serializer = None
            try:
                # If question_vote object already exists we update value, save and make and fill a serializer
                question_vote = QuestionVote.objects.get(author=user_id, question=question_id)
                
                # User's already existing value has changed so we are going to update question score field
                if question_vote.vote_value == vote_value:
                    user_vote_value_has_changed = False

                # Updating question_vote vote value no matter what. Performance does not matter here...
                question_vote.vote_value = vote_value
                question_vote.save()
                question_vote_serializer = QuestionVoteSerializer(question_vote)
            except ObjectDoesNotExist:
                print("Question vote does not exist...")
                pass

           # Question vote did not exist and we are creating one 
            if question_vote_serializer == None:
                question_vote_serializer = QuestionVoteSerializer(data={
                    'author': user_id,
                    'question': question_id,
                    'vote_value': vote_value
                })
                if question_vote_serializer.is_valid():
                    print("question_vote_serializer is valid. saving...")
                    question_vote_serializer.save()
                else:
                    print("question_vote_serializer is not valid. saving...")
                    return Response({ 'message': 'Couldnt create vote', 'errors': question_vote_serializer.errors }, status=status.HTTP_404_NOT_FOUND)

            question_vote_serializer = QuestionVoteSerializer(question_vote)

            question = Question.objects.get(pk=question_id)
            if user_vote_value_has_changed:
                question.score += question_vote_serializer.data['vote_value']
                question.save()
            serializer = QuestionSerializer(question)

            return Response({
                'question_vote': question_vote_serializer.data,
                'question': serializer.data
            }, status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({ 'message': 'User with the ID: ' + user_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            print("[CreateReputationScoreTransaction.post] Something went wrong. Error: ", err)
            return Response({ 'message': 'Internal server error', 'error': str(err) }, status=status.HTTP_404_NOT_FOUND)


