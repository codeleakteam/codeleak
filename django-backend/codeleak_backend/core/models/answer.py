from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone
from .question import Question
from .user import User
from .editor import Editor

class Answer(models.Model):
    # FKs
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,
        related_name='question_answer'
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='answer_author'
    )
    editor = models.ForeignKey(
        'Editor',
        on_delete=models.CASCADE,
    )
    stackblitz_template = models.CharField(max_length=100, blank=False, null=False)
    fs = JSONField(null=True)
    dependencies = JSONField(null=True)
    # Required
    description = models.TextField(blank=False, null=False)
    # Optional
    repository_url = models.CharField(max_length=255, blank=True, null=True)
    # Flags
    is_accepted = models.BooleanField(
        default=False, blank=True, null=False)
    has_comments = models.BooleanField(
        default=False, blank=True, null=False)
    is_edited = models.BooleanField(
        default=False, blank=True, null=False)
    is_deleted = models.BooleanField(
        default=False, blank=True, null=False)
    # Counters
    score = models.IntegerField(default=0, blank=True, null=False)
    reported_times = models.IntegerField(default=0, blank=True, null=False)
    # Timestmaps
    created_at = models.DateTimeField(
        default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        if self.author.full_name:
            author_display_name = self.author.full_name
        else:
            author_display_name = self.author.username
        return '{} by {}'.format(self.question.title, author_display_name)