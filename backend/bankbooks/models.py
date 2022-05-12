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
    situation = models.IntegerField(default=0)
    current_price = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    STOCK_TYPES = (
        ('A', '엔터'),
        ('B', '제조'),
        ('C', '제약'),
    )
    stock_type = models.CharField(max_length=10, choices=STOCK_TYPES)


class MyStock(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    purchase_price = models.IntegerField()
    stocks = models.IntegerField()
    STOCK_TYPES = (
        ('A', '엔터'),
        ('B', '제조'),
        ('C', '제약'),
    )
    stock_type = models.CharField(max_length=10, choices=STOCK_TYPES)


class StockSituation(models.Model):
    change = models.IntegerField()
    article = models.CharField(max_length=200)
    STOCK_TYPES = (
        ('A', '엔터'),
        ('B', '제조'),
        ('C', '제약'),
    )
    stock_type = models.CharField(max_length=10, choices=STOCK_TYPES)
