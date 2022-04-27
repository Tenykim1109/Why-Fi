from django.db import models
from django.conf import settings


class BankBook(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    balance = models.BigIntegerField(default=0)
    payment = models.BigIntegerField()
    interest = models.BigIntegerField(default=0)
    deadline = models.DateField()
    created_at = models.DateField(auto_now_add=True)
    BOOK_TYPES = (
        ('deposit', '예금'),
        ('savings', '적금'),
    )
    book_type = models.CharField(max_length=10, choices=BOOK_TYPES)


class Stock(models.Model):
    STOCK_TYPES = (
        ('A', '엔터'),
        ('B', '제조'),
        ('C', '유통'),
    )
    stock_type = models.CharField(max_length=10, choices=STOCK_TYPES)
    current_price = models.IntegerField()


class MyStock(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    purchase_price = models.IntegerField()
    stocks = models.IntegerField()


class StockSituation(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    change = models.IntegerField()
    article = models.CharField(max_length=200)
