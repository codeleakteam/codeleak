from django.db import models
from django.utils import timezone
# Comment model is inherited. FKs are what's being changed from child to child

class Comment(models.Model):
    class Meta:
        abstract = True

    # Required
    content = models.CharField(max_length=255, blank=True, null=True)
    # FKs
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
    )
    # Flags
    is_edited = models.BooleanField(
        default=False, blank=True, null=False)
    # Counters
    score = models.IntegerField(default=0, blank=True, null=False)
    reported_times = models.IntegerField(default=0, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(
        default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)


class QuestionComment(Comment):
    # FKs
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,
    )


class AnswerComment(Comment):
    # FKs
    answer = models.ForeignKey(
        'Answer',
        on_delete=models.CASCADE,
    )