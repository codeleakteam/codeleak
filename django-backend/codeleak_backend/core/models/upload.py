from django.db import models
from django.conf import settings
from .user import User
from mysite.storage_backends import (
    PrivateMediaStorage,
    PublicMediaStorage 
)

class Upload(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    # we've already set default file storage in settings
    upload = models.FileField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class PrivateUpload(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    upload = models.FileField(storage=PrivateMediaStorage())
    user = models.ForeignKey(User, on_delete=models.CASCADE)