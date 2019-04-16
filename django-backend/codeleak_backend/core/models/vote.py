from django.db import models
from django.utils import timezone

class Vote(models.Model):
    class Meta:
        abstract = True

    # Flags
    vote_value = models.SmallIntegerField(default=0, blank=False, null=False)
    is_deleted = models.BooleanField(default=False, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)


class QuestionVote(Vote):
    # FKs
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,

    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='question_vote_author'
    )


class AnswerVote(Vote):
    # FKs
    answer = models.ForeignKey(
        'Answer',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='answer_vote_author'
    )

class QuestionCommentVote(Vote):
    # FKs
    question_comment = models.ForeignKey(
        'QuestionComment',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='question_comment_vote_author'
    )


class AnswerCommentVote(Vote):
    # FKs
    answer_comment = models.ForeignKey(
        'AnswerComment',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='answer_comment_vote_author'
    )
