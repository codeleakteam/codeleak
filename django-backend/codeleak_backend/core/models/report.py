from django.db import models
from django.utils import timezone

class Report(models.Model):
    class Meta:
        abstract = True
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    
class QuestionReport(Report):
    # FKs
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,

    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='question_report_author'
    )


class AnswerReport(Report):
    # FKs
    answer = models.ForeignKey(
        'Answer',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='answer_report_author'
    )

class QuestionCommentReport(Report):
    # FKs
    question_comment = models.ForeignKey(
        'QuestionComment',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='question_comment_report_author'
    )

class AnswerCommentReport(Report):
    # FKs
    answer_comment = models.ForeignKey(
        'AnswerComment',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='answer_comment_report_author'
    )
