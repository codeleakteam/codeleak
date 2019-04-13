from django.db import models
from django.utils import timezone

class ReputationTransaction(models.Model):
    class Meta:
        abstract = True

    # Required
    amount = models.IntegerField(blank=False, null=False)
    # Flags
    is_deleted = models.BooleanField(
        default=False, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(
        default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)


class QuestionReputationTransaction(ReputationTransaction):
    # FKs
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,
    )


class AnswerReputationTransaction(ReputationTransaction):
    # FKs
    answer = models.ForeignKey(
        'Answer',
        on_delete=models.CASCADE,
    )


class QuestionCommentReputationTransaction(ReputationTransaction):
    # FKs
    question_comment = models.ForeignKey(
        'QuestionComment',
        on_delete=models.CASCADE,
    )


class AnswerCommentReputationTransaction(ReputationTransaction):
    # FKs
    answer_comment = models.ForeignKey(
        'AnswerComment',
        on_delete=models.CASCADE,
    )
