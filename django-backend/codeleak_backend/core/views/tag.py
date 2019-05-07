from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Tag
from core.serializers import TagSerializer
from django.template.defaultfilters import slugify
from django.core.exceptions import ObjectDoesNotExist

class ListCreateTagView(ListCreateAPIView):
    def post(self, request):
        data = request.data

        # Generating slug
        if data["title"] is not None:
            data["slug"] = slugify(data["title"])

        serializer = TagSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        only_popular = request.GET.get("only_popular", None)
        if only_popular == 'true':
            tags = Tag.objects.order_by('-used_times')[:6]
        else:
            tags = Tag.objects.all()

        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetTagView(RetrieveAPIView):
    def get(self, request, tag_id):
        try:
            tag = Tag.objects.get(pk=tag_id)
            serializer = TagSerializer(tag)
            return Response({
                'tag': serializer.data,
            }, status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({ 'message': 'Tag with the ID: ' + tag_id + ' does not exist.'}, status=status.HTTP_404_NOT_FOUND)




