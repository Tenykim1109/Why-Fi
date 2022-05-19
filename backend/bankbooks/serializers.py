from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import BankBook, Stock, MyStock, StockSituation
import datetime


class BankBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankBook
        fields = '__all__'
        read_only_fields = ('user', 'balance', 'interest', 'created_at', 'updated_at', )


class StockListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ('stock_type', 'created_at', 'current_price', )
        read_only_fields = ('current_price', 'created_at', )


class StockSituationSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockSituation
        fields = ('article', )


class StockSerializer(serializers.ModelSerializer):
    stock_situation = serializers.SerializerMethodField('situation_filter')

    def situation_filter(self, stock):
        stocksituation = get_object_or_404(StockSituation, pk=stock.situation)
        serializer = StockSituationSerializer(stocksituation)
        return serializer.data

    class Meta:
        model = Stock
        fields = ('current_price', 'created_at', 'stock_type', 'stock_situation', )


class CustomStockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ('current_price', 'created_at', )


class MyStockSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField('stock_filter')

    def stock_filter(self, mystock):
        stock = get_object_or_404(Stock, stock_type=mystock.stock_type, created_at=datetime.date.today())
        serializer = CustomStockSerializer(stock)
        return serializer.data

    class Meta:
        model = MyStock
        fields = ('purchase_price', 'stocks', 'stock_type', 'stock', )
        read_only_fields = ('purchase_price', 'stock', )
