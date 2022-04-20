from django.urls import path
from . import views


urlpatterns = [
    path('booklist/', views.booklist),
    path('create/', views.create),
    path('<book_type>/delete', views.delete),
]
