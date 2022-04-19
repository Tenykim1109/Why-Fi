from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=10)
    birthday = models.DateField()
    balance = models.IntegerField(default=1000000)
    book_number = models.CharField(max_length=10, blank=True)
    book_password = models.CharField(max_length=4, blank=True)
