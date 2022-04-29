from django.urls import path
from . import views


urlpatterns = [
    path('booklist/', views.booklist),
    path('create/', views.create),
    path('<book_type>/delete/', views.delete),
    path('mystocklist/', views.mystocklist),
    path('buystocks/', views.buystocks),
    path('sellstocks/', views.sellstocks),
]
