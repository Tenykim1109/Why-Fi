from django.contrib import admin
from .models import BankBook, StockInfo, StockSituation


admin.site.register(BankBook)
admin.site.register(StockInfo)
admin.site.register(StockSituation)
