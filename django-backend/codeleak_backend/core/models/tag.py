from django.db import models
from django.utils import timezone

class Tag(models.Model):
    # Required
    title = models.CharField(max_length=70, blank=False, null=False, default='')
    slug = models.SlugField(blank=False, null=False)
    description = models.CharField(max_length=255, blank=False, null=False)
    # Counters
    used_times = models.IntegerField(default=0, blank=True, null=False)
    # Flags
    is_deleted = models.BooleanField(default=False, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title