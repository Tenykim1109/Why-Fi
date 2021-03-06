from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import BankBook, Stock, MyStock
from .serializers import (
    BankBookSerializer,
    StockListSerializer,
    StockSerializer,
    MyStockSerializer,
)
from accounts.serializers import PasswordSerializer
import datetime


@api_view(['GET'])
def booklist(request):
    books = BankBook.objects.filter(user=request.user)
    serializer = BankBookSerializer(books, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=BankBookSerializer)
@api_view(['POST'])
def getinterest(request):
    book_type = request.data.get('book_type')
    payment = request.data.get('payment')
    deadline = request.data.get('deadline')
    days = (datetime.date.fromisoformat(deadline) - datetime.date.today()).days
    weeks = days // 7
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)

    if BankBook.objects.filter(user=user, book_type=book_type).exists():
        return Response({'error: 이미 해당 종류의 통장이 존재'}, status=status.HTTP_400_BAD_REQUEST)

    if payment <= 0 or user.balance < payment:
        return Response({'error: 잘못된 금액 입력'}, status=status.HTTP_400_BAD_REQUEST)

    if weeks <= 0:
        return Response({'error: 잘못된 만기 날짜 입력'}, status=status.HTTP_400_BAD_REQUEST)

    if book_type == 'deposit':
        money = payment * (1.05 ** weeks)
        return Response(int(money))

    elif book_type == 'savings':
        money = (payment * 0.01 * days * (days + 1) / 2) + (payment * days)
        return Response(int(money))

    else:
        return Response({'error: 잘못된 통장 종류 선택'}, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='POST', request_body=BankBookSerializer)
@api_view(['POST'])
def create(request):
    book_type = request.data.get('book_type')
    payment = request.data.get('payment')
    deadline = request.data.get('deadline')
    days = (datetime.date.fromisoformat(deadline) - datetime.date.today()).days
    weeks = days // 7
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)

    if BankBook.objects.filter(user=user, book_type=book_type).exists():
        return Response({'error: 이미 해당 종류의 통장이 존재'}, status=status.HTTP_400_BAD_REQUEST)

    if payment <= 0 or user.balance < payment:
        return Response({'error: 잘못된 금액 입력'}, status=status.HTTP_400_BAD_REQUEST)

    if weeks <= 0:
        return Response({'error: 잘못된 만기 날짜 입력'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = BankBookSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        User = get_user_model()
        user = get_object_or_404(User, pk=request.user.pk)

        if book_type == 'deposit':
            user.balance -= payment
            user.save()
            interest = (payment * (1.05 ** weeks)) - payment
            serializer.save(user=request.user, balance=payment, interest=interest)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        elif book_type == 'savings':
            user.balance -= payment
            user.save()
            interest = payment * 0.01 * days * (days + 1) / 2
            serializer.save(user=request.user, balance=payment, interest=interest)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response({'error: 잘못된 통장 종류 선택'}, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='DELETE', request_body=PasswordSerializer)
@api_view(['DELETE'])
def delete(request, book_type):
    name = request.data.get('name')
    birthday = request.data.get('birthday')
    book_password = request.data.get('book_password')
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)

    if user.name == name and user.birthday == datetime.date.fromisoformat(birthday) and user.book_password == book_password:
        book = get_object_or_404(BankBook, user=user, book_type=book_type)

        if book.deadline <= datetime.date.today():
            user.balance += (book.balance + book.interest)
            user.save()
            book.delete()
            return Response({'response: 만기 해지'}, status=status.HTTP_204_NO_CONTENT)

        elif book.deadline > datetime.date.today():
            user.balance += book.balance
            user.save()
            book.delete()
            return Response({'response: 중도 해지'}, status=status.HTTP_204_NO_CONTENT)

    else:
        return Response({'error: 본인 인증 실패'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def stocknews(request):
    stocks = get_list_or_404(Stock, created_at=datetime.date.today())
    serializer = StockSerializer(stocks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def stockgraph(request):
    json = {}

    for stock_type in ['A', 'B', 'C']:
        json[stock_type] = {}
        stocks = get_list_or_404(Stock, stock_type=stock_type)

        for stock in stocks:
            json[stock_type][str(stock.created_at)] = stock.current_price

    return Response(json)


@api_view(['GET'])
def stockinfo(request, stock_type):
    stocks = get_list_or_404(Stock, stock_type=stock_type)
    serializer = StockListSerializer(stocks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def mystocklist(request):
    mystocks = MyStock.objects.filter(user=request.user).order_by('stock_type')
    serializer = MyStockSerializer(mystocks, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=MyStockSerializer)
@api_view(['POST'])
def buystocks(request):
    stock_type = request.data.get('stock_type')
    stocks = request.data.get('stocks')
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)

    if stock_type not in ['A', 'B', 'C']:
        return Response({'error: 잘못된 기업 선택'}, status=status.HTTP_400_BAD_REQUEST)

    stock = get_object_or_404(Stock, stock_type=stock_type, created_at=datetime.date.today())

    if stocks <= 0 or user.balance < stock.current_price * stocks:
        return Response({'error: 잘못된 주식수 입력'}, status=status.HTTP_400_BAD_REQUEST)

    if MyStock.objects.filter(user=user, stock_type=stock_type).exists():
        mystock = get_object_or_404(MyStock, user=user, stock_type=stock_type)
        serializer = MyStockSerializer(mystock, data=request.data)

        if serializer.is_valid(raise_exception=True):
            new_stocks = mystock.stocks + stocks
            new_purchase_price = (mystock.purchase_price * mystock.stocks + stock.current_price * stocks) / new_stocks
            user.balance -= stock.current_price * stocks
            user.save()
            serializer.save(user=user, purchase_price=new_purchase_price, stocks=new_stocks)
            return Response(status=status.HTTP_200_OK)

    else:
        serializer = MyStockSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user.balance -= stock.current_price * stocks
            user.save()
            serializer.save(user=user, purchase_price=stock.current_price)
            return Response(status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='DELETE', request_body=MyStockSerializer)
@api_view(['DELETE'])
def sellstocks(request):
    stock_type = request.data.get('stock_type')
    stocks = request.data.get('stocks')
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)

    if stock_type not in ['A', 'B', 'C']:
        return Response({'error: 잘못된 기업 선택'}, status=status.HTTP_400_BAD_REQUEST)

    stock = get_object_or_404(Stock, stock_type=stock_type, created_at=datetime.date.today())
    mystock = get_object_or_404(MyStock, user=user, stock_type=stock_type)

    if stocks <= 0 or stocks > mystock.stocks:
        return Response({'error: 잘못된 주식수 입력'}, status=status.HTTP_400_BAD_REQUEST)

    elif stocks == mystock.stocks:
        user.balance += stock.current_price * stocks
        user.save()
        mystock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif stocks < mystock.stocks:
        user.balance += stock.current_price * stocks
        user.save()
        mystock.stocks -= stocks
        mystock.save()
        return Response(status=status.HTTP_200_OK)
