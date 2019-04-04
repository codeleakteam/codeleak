from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.decorators import api_view
from core.models import User, Question, Tag
from core.serializers import UserSerializerMinimal, QuestionSerializer, TagSerializerMinimal

@api_view(['GET'])
def user_question_tag_search(request):
    q_str = request.GET.get('q', '')

    if q_str is not '':
        # User search
        q_user = Q(full_name__icontains=q_str) | Q(username__icontains=q_str) | Q(email__icontains=q_str)
        users = User.objects.filter(q_user)[:3]
        users_serializer = UserSerializerMinimal(users, many=True)

        # Question search
        q_questions = Q(title__icontains=q_str)
        questions = Question.objects.filter(q_questions)[:10]
        questions_serializer = QuestionSerializer(questions, many=True)

        # Tags search
        q_tags = Q(title__icontains=q_str)
        tags = Tag.objects.filter(q_tags)[:5]
        tags_serializer = TagSerializerMinimal(tags, many=True)

        return Response({
                'users': users_serializer.data,
                'questions': questions_serializer.data,
                'tags': tags_serializer.data
                }, status.HTTP_200_OK)
    else:
        return Response({ 'message': 'No q paramter was provided' })
