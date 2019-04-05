from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Tag
from core.serializers import TagIDSerializer
from django.template.defaultfilters import slugify


class TagView(APIView):
    def post(self, request):
        data = request["data"]

        # Generating slug
        if request["title"] is not None:
            data.slug = slugify(request["title"])

        serializer = TagIDSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

