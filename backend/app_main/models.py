from uuid import uuid4

from django.db import models


class Subject(models.Model):
    id = models.UUIDField(default=uuid4, unique=True, editable=False, primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
