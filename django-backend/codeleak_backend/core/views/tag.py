from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Tag
from core.serializers import TagSerializer
from django.template.defaultfilters import slugify


class ListCreateTagView(ListCreateAPIView):
    def post(self, request):
        data = request.data
        print("DATTT", data)

        # Generating slug
        if data["title"] is not None:
            data["slug"] = slugify(data["title"])

        serializer = TagSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


