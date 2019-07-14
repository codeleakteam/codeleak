from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from core.models import Question, Tag
from core.serializers import QuestionSerializer, TagSerializerMinimal

class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'popular_tags': data['tags'],
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data['questions']
        })

class HomeView(generics.ListAPIView):
    permission_classes = ()
    pagination_class = CustomPagination

    # Used by self.get_serializer() down below
    # serializer_class = QuestionSerializer
    question_serializer = QuestionSerializer
    tag_serializer = TagSerializerMinimal

    # def get_serializer_class(self):
    #     return QuestionSerializer

    # Returns questions queryset
    def get_queryset(self):
        return Question.objects.all()

    def get_queryset_Tag(self):
        return Tag.objects.all()

    def get(self, request, *args, **kwargs):
        tags_serializer = self.tag_serializer(self.get_queryset_Tag(), many=True)
        page = self.paginate_queryset(Question.objects.all())

        if page is not None:
            questions_serializer = self.question_serializer(page, many=True)
            return self.get_paginated_response({ 'questions': questions_serializer.data, 'tags': tags_serializer.data })
        else:
            return JsonResponse({
                    'questions': self.question_serializer(Question.objects.all(), many=True).data,
                    'popular_tags': tags_serializer.data
                })
