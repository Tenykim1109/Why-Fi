from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import BankBook
from .serializers import (
    BankBookSerializer,
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

    if book_type == 'stock':
        request.data['deadline'] = str(datetime.date.today())

    payment = request.data.get('payment')
    deadline = request.data.get('deadline')
    weeks = (datetime.date.fromisoformat(deadline) - datetime.date.today()).days // 7

    if payment <= 0:
        return Response({'error: 잘못된 금액 입력'}, status=status.HTTP_400_BAD_REQUEST)

    if book_type != 'stock' and weeks <= 0:
        return Response({'error: 잘못된 만기 날짜 입력'}, status=status.HTTP_400_BAD_REQUEST)

    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)
    serializer = BankBookSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
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

        elif book_type == 'stock':
            serializer.save(user=request.user)

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
