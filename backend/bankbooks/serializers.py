from rest_framework import serializers
from .models import BankBook, StockInfo, StockSituation


class BankBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankBook
        fields = '__all__'
        read_only_fields = ('user', 'balance', 'interest', 'created_at', )
