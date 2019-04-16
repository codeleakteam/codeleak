from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Subscriber 
from core.serializers import SubscriberSerializer 

class CreateSubscriberView(RetrieveUpdateAPIView):
    def post(self, request):
        print("Create subscribe data", request.data)
        serializer = SubscriberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_202_ACCEPTED)

