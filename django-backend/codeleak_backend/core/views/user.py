from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from core.models import User
from core.serializers import UserSerializer

class UpdateUserView(UpdateAPIView):
    def put(self, request, user_id):
        print("Update quesiton data: ", request.data)
        print("Update question id: ", user_id)
        user = User.objects.get(pk=user_id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_202_ACCEPTED)

