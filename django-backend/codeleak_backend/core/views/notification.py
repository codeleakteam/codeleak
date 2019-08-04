from rest_framework.generics import (
    RetrieveUpdateAPIView,
    ListAPIView,
    UpdateAPIView, 
    RetrieveAPIView,
    RetrieveUpdateAPIView
)
from rest_framework.response import Response
from rest_framework import status, serializers
from core.models import (
    User,
    AnswerVote,
    QuestionVote,
    QuestionComment,
    AnswerComment
)
from core.serializers import (
    UserSerializer,
    UserSerializerMinimal,
    UpdateUserSerializer,
    QuestionVoteSerializer,
    AnswerVoteSerializer,
    QuestionCommentSerializer,
    AnswerCommentSerializer
)
from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser

SAFE_METHODS = ["GET", "OPTIONS", "HEAD"]

class NotificationJSONDataSerializer(serializers.Serializer):
    vote_value = serializers.IntegerField()

# class GenericNotificationRelatedField(serializers.RelatedField):
#     def to_representation(self, value):
#         if isinstance(value, QuestionVote):
#             string_representation = str(QuestionVote)
#         if isinstance(value, AnswerVote):
#             string_representation = str(AnswerVote)
#         if isinstance(value, QuestionComment):
#             string_representation = str(QuestionComment)
#         if isinstance(value, AnswerComment):
#             string_representation = str(AnswerComment)
#         return string_representation

class NotificationSerializer(serializers.Serializer):
    recipient = serializers.CharField(max_length=250, read_only=True)
    target = serializers.CharField(max_length=250, read_only=True)
    actor = UserSerializerMinimal()
    verb = serializers.CharField(max_length=50, read_only=True)
    timestamp = serializers.CharField(max_length=250, read_only=True)
    unread = serializers.BooleanField(read_only=True)
    data = NotificationJSONDataSerializer()
    target_object_id = serializers.IntegerField()
    action_object_object_id = serializers.IntegerField()

class IsMe(permissions.BasePermission):
    message = 'Not allowed'
    def has_permission(self, request, view):
        user_id = int(view.kwargs.get('user_id', None))
        return user_id == request.user.id
        
class GetUnreadNotifications(ListAPIView):
    permission_classes = (IsMe, )
    def get(self, request, user_id):
        notifications = request.user.notifications.unread()
        serializer = NotificationSerializer(notifications, many=True)
        return Response({
            'notifications': serializer.data
        }, status=status.HTTP_200_OK)

class MarkAllAsRead(UpdateAPIView):
    permission_classes = (IsMe, )
    def put(self, request, user_id):
        notifications = request.user.notifications.unread().mark_all_as_read()
        return Response({
            'message': 'Success'
        }, status=status.HTTP_200_OK)

class MarkAllAsUnread(UpdateAPIView):
    permission_classes = (IsMe, )
    def put(self, request, user_id):
        notifications = request.user.notifications.read().mark_all_as_unread()
        return Response({
            'message': 'Success'
        }, status=status.HTTP_200_OK)