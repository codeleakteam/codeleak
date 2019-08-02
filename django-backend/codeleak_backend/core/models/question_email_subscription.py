from django.db import models
from django.utils import timezone

class QuestionEmailSubscription(models.Model):
    # Required
    email = models.EmailField(unique=True)
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,

    )
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)

    def __str__(self):
        return self.email