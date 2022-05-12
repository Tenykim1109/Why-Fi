import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
import django
django.setup()
from django.shortcuts import get_list_or_404
from bankbooks.models import BankBook, Stock, StockSituation
import concurrent.futures, datetime, time


def daily():
    if not Stock.objects.filter(created_at=datetime.date.today()).exists():
        stocks = get_list_or_404(Stock, created_at=(datetime.date.today() - datetime.timedelta(1)))

        for stock in stocks:
            stocksituation = StockSituation.objects.filter(stock_type=stock.stock_type).order_by('?')[0]

            new_stock = Stock(
                situation=stocksituation.id,
                current_price=(stock.current_price + ((stock.current_price * stocksituation.change) // 100)),
                stock_type=stock.stock_type
            )

            new_stock.save()

        savings = BankBook.objects.filter(book_type='savings')

        for saving in savings:
            if saving.deadline > datetime.date.today():
                user = saving.user

                if saving.payment <= user.balance:
                    user.balance -= saving.payment
                    user.save()
                    saving.balance += saving.payment
                    saving.save()

                else:
                    saving.interest -= (saving.payment * (1.01 ** (saving.deadline - datetime.date.today()).days) - saving.payment)
                    saving.save()

    else:
        print("pass")

    time.sleep(60)


if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        while True:
            future = executor.submit(daily)
