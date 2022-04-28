import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
import django
django.setup()
from django.shortcuts import get_list_or_404
from bankbooks.models import Stock, StockSituation
import concurrent.futures, datetime, time


def daily_stock_variance():
    stocks = get_list_or_404(Stock)

    for stock in stocks:
        if stock.updated_at != datetime.date.today():
            stocksituation = StockSituation.objects.filter(stock=stock).order_by('?')[0]
            stock.current_price += (stock.current_price * stocksituation.change) // 100
            stock.situation = stocksituation.id
            stock.save()

    time.sleep(3600)


if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        while True:
            future = executor.submit(daily_stock_variance)
