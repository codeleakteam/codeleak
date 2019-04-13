from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from core.models import User
from core.serializers import UserSerializer

class GetUpdateUserView(RetrieveUpdateAPIView):
    def get(self, request, user_id):
        print("Get user API endpoint: ", user_id)
        user = User.objects.filter(pk=user_id).prefetch_related('question_author', 'answer_author')[0]
        serializer = UserSerializer(user)
        print("WHERE AM I", user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def put(self, request, user_id):
        print("Update quesiton data: ", request.data)
        print("Update question id: ", user_id)
        user = User.objects.get(pk=user_id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_202_ACCEPTED)

