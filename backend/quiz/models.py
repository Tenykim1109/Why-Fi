from django.db import models


class Quiz(models.Model):
    question = models.CharField(max_length=100)
    answer = models.CharField(max_length=2)
    commentary = models.CharField(max_length=200)
    quiz_type = models.CharField(max_length=10)
    choices_view = models.CharField(max_length=100, blank=True)
