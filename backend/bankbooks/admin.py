from django.contrib import admin
from .models import BankBook, Stock, MyStock, StockSituation


admin.site.register(BankBook)
admin.site.register(Stock)
admin.site.register(MyStock)
admin.site.register(StockSituation)
