from django.db import models
from django.conf import settings


class BankBook(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    balance = models.BigIntegerField(default=0)
    payment = models.BigIntegerField(default=0)
    interest = models.BigIntegerField(default=0)
    deadline = models.DateField()
    created_at = models.DateField(auto_now_add=True)
    BOOK_TYPES = (
        ('deposit', '예금'),
        ('savings', '적금'),
        ('stock', '주식'),
    )
    book_type = models.CharField(max_length=10, choices=BOOK_TYPES)


class StockInfo(models.Model):
    bankbook = models.ForeignKey(BankBook, on_delete=models.CASCADE)
    name = models.CharField(max_length=10)
    price = models.IntegerField()
    stock = models.IntegerField()


class StockSituation(models.Model):
    name = models.CharField(max_length=10)
    change = models.IntegerField()
    article = models.CharField(max_length=200)
