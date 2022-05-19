from django.urls import path
from . import views


urlpatterns = [
    path('booklist/', views.booklist),
    path('getinterest/', views.getinterest),
    path('create/', views.create),
    path('<book_type>/delete/', views.delete),
    path('stocknews/', views.stocknews),
    path('stockgraph/', views.stockgraph),
    path('stockinfo/<stock_type>/', views.stockinfo),
    path('mystocklist/', views.mystocklist),
    path('buystocks/', views.buystocks),
    path('sellstocks/', views.sellstocks),
]
