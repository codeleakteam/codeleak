from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from core.models import (
    User,
    QuestionComment,
    AnswerComment,
    QuestionCommentVote,
    AnswerCommentVote,
    Answer,
    Question
)
from core.serializers import (
    AnswerCommentSerializer,
    QuestionCommentSerializer,
    CreateAnswerCommentSerializer,
    CreateQuestionCommentSerializer,
    QuestionCommentVoteSerializer,
    AnswerCommentVoteSerializer
)

COMMENT_UPVOTE_VALUE = 20
COMMENT_DOWNVOTE_VALUE = -5


COMMENT_TYPES = {
    'QUESTION_COMMENT': {
        'key': 'question_comment',
        'model': QuestionComment,
        'serializer': QuestionCommentSerializer,
        'create_serializer': CreateQuestionCommentSerializer,
        'vote_serializer': QuestionCommentVoteSerializer,
        'model_commented_on': Question
    },
    'ANSWER_COMMENT': {
        'key': 'answer_comment',
        'model': AnswerComment,
        'serializer': AnswerCommentSerializer,
        'create_serializer': CreateAnswerCommentSerializer,
        'vote_serializer': AnswerCommentVoteSerializer,
        'model_commented_on': Answer
    }
}

# Helper that evaluates 'true' to True and does so for false values
def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1")

class ListCreateCommentView(ListCreateAPIView):
    COMMENT_TYPES = COMMENT_TYPES

    def get(self, request):
        comment_type = request.GET.get('comment_type', None)
        if comment_type == None:
            return Response({ 'message': 'comment_type param not provided'}, status.HTTP_400_BAD_REQUEST)

        if comment_type not in COMMENT_TYPES:
            return Response({ 'message': 'comment_type param is invalid'}, status.HTTP_400_BAD_REQUEST)
        CommentModel = COMMENT_TYPES[comment_type]['model']
        CommentSerializer = COMMENT_TYPES[comment_type]['serializer']
        comment_key = COMMENT_TYPES[comment_type]['key']

        try:
            comments = CommentModel.objects.all()
            serializer = CommentSerializer(comments, many=True)
            response = {}
            response[comment_key] = serializer.data
            return Response(response, status.HTTP_200_OK)
        except Exception as err:
            return Response({'message': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def post(self, request):
        comment_type = request.data.get('comment_type', None)
        object_id = request.data.get('object_id', None)
        author = request.data.get('author', None)

        if comment_type == None:
            return Response({ 'message': 'comment_type param not provided'}, status.HTTP_400_BAD_REQUEST)
        if object_id == None:
            return Response({ 'message': 'object_id param not provided'}, status.HTTP_400_BAD_REQUEST)
        if author == None:
            return Response({ 'message': 'author param not provided'}, status.HTTP_400_BAD_REQUEST)
        if comment_type not in COMMENT_TYPES:
            return Response({ 'message': 'comment_type param is invalid'}, status.HTTP_400_BAD_REQUEST)

        CommentModel = COMMENT_TYPES[comment_type]['model']
        ModelCommentedOn = COMMENT_TYPES[comment_type]['model_commented_on']
        CreateCommentSerializer = COMMENT_TYPES[comment_type]['create_serializer']
        CommentSerializer = COMMENT_TYPES[comment_type]['serializer']
        
        comment_key = COMMENT_TYPES[comment_type]['key']

        object_commented_on = None
        try:
            object_commented_on = ModelCommentedOn.objects.get(pk=object_id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Object with the ID: ' + str(object_id) + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        write_data = request.data
        write_data['question'] = object_id
        create_comment_serializer = CreateCommentSerializer(data=write_data)
        if create_comment_serializer.is_valid():
            object_commented_on.has_comments = True
            object_commented_on.save()
            new_comment_obj = create_comment_serializer.save()
            read_comment_serializer = CommentSerializer(new_comment_obj)
            return Response({
                'has_comments': object_commented_on.has_comments,
                'comment': read_comment_serializer.data
            }, status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateCommentScoreView(UpdateAPIView):
    COMMENT_TYPES = COMMENT_TYPES
    def put(self, request, comment_id):
        is_upvote = request.data.get('is_upvote', None)
        user_id = request.data.get('user_id', None)
        comment_type = request.data.get('comment_type', None)
        COMMENT_TYPES = self.COMMENT_TYPES
        # Field checks
        if comment_type == None:
            return Response({ 'message': 'comment_type param not provided'}, status.HTTP_400_BAD_REQUEST)

        if comment_type not in COMMENT_TYPES:
            return Response({ 'message': 'comment_type param is invalid'}, status.HTTP_400_BAD_REQUEST)

        if is_upvote == None:
            return Response({ 'message': 'is_upvote param not provided'}, status.HTTP_400_BAD_REQUEST)

        if user_id == None:
            return Response({ 'message': 'user_id value param not provided'}, status.HTTP_400_BAD_REQUEST)

        if is_upvote != 'true' and is_upvote != 'false':
            return Response({ 'message': 'Invalid is_upvote param'}, status.HTTP_400_BAD_REQUEST)

        # Checking if user exists
        try:
            user = User.objects.get(pk=user_id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'User with the ID: ' + user_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Checking if comment entity exists
        try:
            if comment_type == 'QUESTION_COMMENT':
                comment = QuestionComment.objects.get(pk=comment_id)
            else:
                comment = AnswerComment.objects.get(pk=comment_id)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Comment object with the ID: ' + comment_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Flags
        is_upvote = str2bool(is_upvote)

        # Vote value(adds up only on answer score)
        vote_value = None

        if is_upvote:
            vote_value = COMMENT_UPVOTE_VALUE
        else:
            vote_value = COMMENT_DOWNVOTE_VALUE

        # Dynamically get comment model and its serializer
        CommentModel = COMMENT_TYPES[comment_type]['model']
        CommentSerializer = COMMENT_TYPES[comment_type]['serializer']
        CommentVoteSerializer = COMMENT_TYPES[comment_type]['vote_serializer']
        comment_key = COMMENT_TYPES[comment_type]['key']

        try:
            if comment_type == 'QUESTION_COMMENT':
                comment_vote = QuestionCommentVote.objects.get(author=user_id, question_comment=comment_id)
            else:
                comment_vote = AnswerCommentVote.objects.get(author=user_id, answer_comment=comment_id)

            # Case where user might be switching from upvote to downvote
            if comment_vote.is_upvote != is_upvote:
                comment_vote.is_upvote = is_upvote
                comment_vote.save()
                comment_vote_serializer = CommentVoteSerializer(comment_vote)

                # * 2 because of switch;
                comment.score += vote_value * 2
                comment.save()

                user.reputation += vote_value * 2
                user.save()

                serializer = CommentSerializer(comment)
                return Response({
                    'comment_vote': comment_vote_serializer.data,
                    'comment': serializer.data,
                    'vote_value': vote_value
                }, status.HTTP_200_OK)
            # If user tries to upvote an already upvoted answer
            else:
                return Response({
                    'message': 'You can only vote once in the same direction'
                }, status=status.HTTP_400_BAD_REQUEST)

        # If it does not exist, we create one
        except ObjectDoesNotExist:
            data = {
                'author': user_id,
                'is_upvote': is_upvote
            }
            data[comment_key] = comment_id
            comment_vote_serializer = CommentVoteSerializer(data=data)
            if comment_vote_serializer.is_valid():
                print("comment_vote_serializer is valid. saving...")
                comment_vote_serializer.save()
            else:
                print("comment_vote_serializer isn't valid. aborting...")
                return Response(comment_vote_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            comment.score += vote_value
            comment.save()
            serializer = CommentSerializer(comment)
            return Response({
                'comment_vote': comment_vote_serializer.data,
                'comment': serializer.data
            }, status.HTTP_200_OK)

class ReportCommentView(APIView):
    COMMENT_TYPES = COMMENT_TYPES
    def post(self, request, comment_id):
        # TODO: Only question author can accept answer
        comment_type = request.data.get('comment_type', None)
        user_id = request.data.get("user_id", None)
        COMMENT_TYPES = self.COMMENT_TYPES

        # Field checks
        if user_id == None:
            return Response({ 'message': 'user_id param not provided'}, status.HTTP_400_BAD_REQUEST)

        if comment_type == None:
            return Response({ 'message': 'comment_type param not provided'}, status.HTTP_400_BAD_REQUEST)

        if comment_type not in COMMENT_TYPES:
            return Response({ 'message': 'comment_type param is invalid'}, status.HTTP_400_BAD_REQUEST)

        CommentModel = COMMENT_TYPES[comment_type]['model']
        CommentSerializer = COMMENT_TYPES[comment_type]['serializer']
        comment_key = COMMENT_TYPES[comment_type]['key']

        try:
            comment = CommentModel.objects.get(pk=comment_id)
            comment.reported_times += 1
            comment.save()
            serializer = CommentSerializer(comment)
            return Response({
                'comment': serializer.data
            }, status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({ 'message': 'Comment with the ID: ' + comment_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)
