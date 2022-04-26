from rest_framework import serializers
from .models import BankBook, Stock, MyStock, StockSituation


class BankBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankBook
        fields = '__all__'
        read_only_fields = ('user', 'balance', 'interest', 'created_at', )


class MyStockSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyStock
        fields = '__all__'
        read_only_fields = ('bankbook', )
