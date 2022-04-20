from rest_framework import serializers
from .models import BankBook, StockInfo, StockSituation


class BankBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankBook
        fields = ('payment', 'deadline', 'book_type', )
