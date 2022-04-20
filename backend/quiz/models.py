from django.db import models


class Quiz(models.Model):
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=2)
    commentary = models.CharField(max_length=200)
    quiz_type = models.CharField(max_length=10)
    choices_view1 = models.CharField(max_length=100, blank=True)
    choices_view2 = models.CharField(max_length=100, blank=True)
    choices_view3 = models.CharField(max_length=100, blank=True)
    choices_view4 = models.CharField(max_length=100, blank=True)
