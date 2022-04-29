import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
import django
django.setup()
from django.shortcuts import get_list_or_404
from bankbooks.models import BankBook, Stock, StockSituation
import concurrent.futures, datetime, time


def daily():
    savings = BankBook.objects.filter(book_type='savings')

    for saving in savings:
        if saving.updated_at != datetime.date.today() and saving.deadline > datetime.date.today():
            user = saving.user

            if saving.payment <= user.balance:
                user.balance -= saving.payment
                user.save()
                saving.balance += saving.payment
                saving.save()

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
            future = executor.submit(daily)
