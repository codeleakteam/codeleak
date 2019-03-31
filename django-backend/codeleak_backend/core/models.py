from django.db import models
from django.utils import timezone

# Create your models here.

# optional char field - models.CharField(max_length=255, blank=True, null=True)


class Editor(models.Model):
    # Required
    name = models.CharField(max_length=30, blank=False, null=False)
    # Timestmaps
    created_at = models.DateTimeField(
        default=timezone.now(), blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)


class User(models.Model):
    # Required
    email = models.EmailField()
    username = models.CharField(max_length=150, blank=False, null=False)
    password_hash = models.CharField(max_length=255, blank=False, null=False)
    # Optional
    biography = models.CharField(max_length=255, blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    cv_url = models.URLField(blank=True, null=True)
    twitter_username = models.CharField(max_length=50, blank=True, null=True)
    github_username = models.CharField(max_length=50, blank=True, null=True)
    company = models.CharField(max_length=50, blank=True, null=True)
    company_headquarters = models.CharField(
        max_length=100, blank=True, null=True)
    role_in_company = models.CharField(max_length=150, blank=True, null=True)
    location = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    birth = models.DateField(blank=True, null=True)
    # Flags
    student = models.BooleanField(default=False, blank=True, null=False)
    verified = models.BooleanField(default=False, blank=True, null=False)
    looking_for_job = models.BooleanField(
        default=False, blank=True, null=False)
    # Counters
    reputation = models.IntegerField(default=0, blank=True, null=False)
    reported_times = models.IntegerField(default=0, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(
        default=timezone.now(), blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)


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
    has_accepted_answer = models.BooleanField(
        default=False, blank=True, null=False)
    has_comments = models.BooleanField(
        default=False, blank=True, null=False)
    is_edited = models.BooleanField(
        default=False, blank=True, null=False)
    is_deleted = models.BooleanField(
        default=False, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(
        default=timezone.now(), blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)


class Answer(models.Model):
    # FKs
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
    )
    editor = models.ForeignKey(
        'Editor',
        on_delete=models.CASCADE,
    )
    # Required
    description = models.CharField(max_length=255, blank=False, null=False)
    # Optional
    repository_url = models.CharField(max_length=255, blank=True, null=True)
    # Flags
    has_comments = models.BooleanField(
        default=False, blank=True, null=False)
    is_edited = models.BooleanField(
        default=False, blank=True, null=False)
    is_deleted = models.BooleanField(
        default=False, blank=True, null=False)
    # Timestmaps
    created_at = models.DateTimeField(
        default=timezone.now(), blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)


# Comment model is inherited. FKs are what's being changed from child to child


class Comment(models.Model):
    class Meta:
        abstract = True

    # Required
    content = models.CharField(max_length=255, blank=True, null=True)
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
        default=timezone.now(), blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)


class QuestionComment(Comment):
    # FKs
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,
    )


class AnswerComment(Comment):
    # FKs
    answer = models.ForeignKey(
        'Answer',
        on_delete=models.CASCADE,
    )


class Tag(models.Model):
    # Required
    title = models.CharField(max_length=70, blank=True, null=True)
    slug = models.SlugField(blank=False, null=False)
    # Flags
    is_deleted = models.BooleanField(
        default=False, blank=True, null=False)
    # Timestamps
    created_at = models.DateTimeField(
        default=timezone.now(), blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)


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
        default=timezone.now(), blank=True, null=False)
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
