from django.db import models
from django.utils import timezone
from .tag import Tag

class Question(models.Model):
    # Required
    title = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField(blank=False, null=False)
    slug = models.SlugField(blank=False, null=False)
    # Optional
    repository_url = models.CharField(max_length=255, blank=True, null=True)
    # FKs
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
    )
    editor = models.ForeignKey(
        'Editor',
        on_delete=models.CASCADE,
    )
    # ManyToMany
    tags = models.ManyToManyField(Tag)
    # Counters
    score = models.IntegerField(default=0, blank=True, null=False)
    reported_times = models.IntegerField(default=0, blank=True, null=False)
    # Flags
    has_accepted_answer = models.BooleanField(default=False, blank=True, null=False)
    has_comments = models.BooleanField(default=False, blank=True, null=False)
    is_edited = models.BooleanField(default=False, blank=True, null=False)
    is_deleted = models.BooleanField(default=False, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return '{} by {}'.format(self.title, self.author)