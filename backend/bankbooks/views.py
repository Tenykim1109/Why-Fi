from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import BankBook, MyStock
from .serializers import (
    BankBookSerializer,
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
def create(request):
    book_type = request.data.get('book_type')

    if BankBook.objects.filter(user=request.user, book_type=book_type).exists():
        return Response({'error: 이미 해당 종류의 통장이 존재'}, status=status.HTTP_400_BAD_REQUEST)

    if book_type == 'stock':
        serializer = BankBookSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, deadline=datetime.date.today())

    else:
        payment = request.data.get('payment')
        deadline = request.data.get('deadline')
        weeks = (datetime.date.fromisoformat(deadline) - datetime.date.today()).days // 7

        if payment <= 0:
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
                interest = payment * (1.05 ** weeks) - payment
                serializer.save(user=request.user, balance=payment, interest=interest)

            elif book_type == 'savings':
                user.balance -= payment
                user.save()
                interest = payment * 1.01 * (((1.01 ** (weeks * 7)) - 1) / 1.01)
                serializer.save(user=request.user, balance=payment, interest=interest)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


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

        if datetime.date.fromisoformat(book.deadline) < datetime.date.today():
            user.balance += book.balance
            user.save()
            book.delete()
            return Response({'response: 중도 해지'}, status=status.HTTP_204_NO_CONTENT)

        elif datetime.date.fromisoformat(book.deadline) >= datetime.date.today():
            user.balance += (book.balance + book.interest)
            user.save()
            book.delete()
            return Response({'response: 만기 해지'}, status=status.HTTP_204_NO_CONTENT)
    
    else:
        return Response({'error: 본인 인증 실패'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def mystocklist(request):
    stockbook = get_object_or_404(BankBook, user=request.user, book_type='stock')
    mystocks = MyStock.objects.filter(bankbook=stockbook)
    serializer = MyStockSerializer(mystocks, many=True)
    return Response(serializer.data)


def buystocks(request):
    pass


def sellstocks(request):
    pass
