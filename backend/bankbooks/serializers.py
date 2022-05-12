from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import BankBook, Stock, MyStock
import datetime


class BankBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankBook
        fields = '__all__'
        read_only_fields = ('user', 'balance', 'interest', 'created_at', 'updated_at', )


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ('stock_type', 'created_at', 'current_price', )
        read_only_fields = ('current_price', 'created_at', )


class MyStockSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField('filter')

    def filter(self, mystock):
        stock = get_object_or_404(Stock, stock_type=mystock.stock_type, created_at=datetime.date.today())
        serializer = StockSerializer(stock)
        return serializer.data

    class Meta:
        model = MyStock
        fields = ('purchase_price', 'stocks', 'stock_type', 'stock', )
        read_only_fields = ('purchase_price', 'stock', )
