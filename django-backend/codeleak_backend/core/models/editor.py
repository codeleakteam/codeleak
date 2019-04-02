from django.db import models
from django.utils import timezone

class Editor(models.Model):
    # Required
    name = models.CharField(max_length=30, blank=False, null=False)
    # Timestmaps
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    
    def __str__(self):
        return self.name