from django.db import models
from django.utils import timezone
# Comment model is inherited. FKs are what's being changed from child to child

class Comment(models.Model):
    class Meta:
        abstract = True

    # Required
    content = models.CharField(max_length=255, blank=False, null=False)
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
        related_name='question_comment'
    )

    def __str__(self):
        if self.author.full_name:
            author_display_name = self.author.full_name
        else:
            author_display_name = self.author.username

        return '{} by {}'.format(self.question.title, author_display_name)

class AnswerComment(Comment):
    # FKs
    answer = models.ForeignKey(
        'Answer',
        on_delete=models.CASCADE,
        related_name='answer_comment'
    )

    def __str__(self):
        if self.author.full_name:
            author_display_name = self.author.full_name
        else:
            author_display_name = self.author.username

        return '{} by {}'.format(self.answer.question.title, author_display_name)
