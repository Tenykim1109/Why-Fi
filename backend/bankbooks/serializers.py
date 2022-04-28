from rest_framework import serializers
from .models import BankBook, Stock, MyStock


class BankBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankBook
        fields = '__all__'
        read_only_fields = ('user', 'balance', 'interest', 'created_at', )


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ('stock_type', 'current_price', )
        read_only_fields = ('current_price', 'updated_at', )


class MyStockSerializer(serializers.ModelSerializer):
    stock = StockSerializer()

    class Meta:
        model = MyStock
        fields = ('purchase_price', 'stocks', 'stock', )
        read_only_fields = ('purchase_price', )
