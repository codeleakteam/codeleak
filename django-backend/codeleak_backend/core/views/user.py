from rest_framework.generics import (
    RetrieveUpdateAPIView,
    ListAPIView,
    UpdateAPIView, 
    RetrieveAPIView,
    RetrieveUpdateAPIView
)
from rest_framework.response import Response
from rest_framework import status
from core.models import User
from core.serializers import UserSerializer
from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser

SAFE_METHODS = ["GET", "OPTIONS", "HEAD"]

class IsMeOrReadOnly(permissions.BasePermission):
    message = 'User edit not allowed'
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        print("user", request.user)
        print("obj", obj)
        return request.user.id == obj.id
        
class ListUserView(ListAPIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetUpdateUserView(RetrieveUpdateAPIView):
    parser_classes = [FormParser, MultiPartParser, ]
    permission_classes = (IsMeOrReadOnly, )
    
    def get(self, request, user_id):
        users = User.objects.filter(pk=user_id).prefetch_related('question_author', 'answer_author')
        if len(users) > 0:
            user = users[0]
        else:
            return Response({
                'user': None
            }, status=status.HTTP_200_OK)

        serializer = UserSerializer(user)
        return Response({
            'user': serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request, user_id):
        print("Update quesiton data: ", request.data)
        print("Update question id: ", user_id)
        file_obj = request.FILES.get('avatar', None)
        print("file obj", file_obj)
        user = User.objects.get(pk=user_id)
        self.check_object_permissions(request, user)
        if file_obj is not None:
            request.data['avatar'] = file_obj
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_202_ACCEPTED)