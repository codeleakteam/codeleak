from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
)

class User(AbstractUser):
    # Required
    email = models.EmailField()
    username = models.CharField(max_length=150, unique=True, blank=False, null=False)
    password = models.CharField(max_length=255, blank=False, null=False)
    # Optional
    full_name = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.FileField()
    biography = models.CharField(max_length=255, blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    cv_url = models.URLField(blank=True, null=True)
    twitter_username = models.CharField(max_length=50, blank=True, null=True)
    github_username = models.CharField(max_length=50, blank=True, null=True)
    company = models.CharField(max_length=50, blank=True, null=True)
    company_headquarters = models.CharField(max_length=100, blank=True, null=True)
    role_in_company = models.CharField(max_length=150, blank=True, null=True)
    location = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True, choices=GENDER_CHOICES)
    birth = models.DateField(blank=True, null=True)
    # Flags
    student = models.BooleanField(default=False, blank=True, null=False)
    looking_for_job = models.BooleanField(default=False, blank=True, null=False)
    # Counters
    reputation = models.IntegerField(default=0, blank=True, null=False)
    reported_times = models.IntegerField(default=0, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)

    def __str__(self):
        if self.full_name is not None:
            return self.full_name
        else:
            return self.username