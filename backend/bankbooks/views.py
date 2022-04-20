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
    payment = request.data.get('payment')
    deadline = request.data.get('deadline')
    book_type = request.data.get('book_type')

    if datetime.date.strftime(deadline, '%Y-%m-%d') <= datetime.date.today():
        return Response({'error: 만기 날짜 오류'}, status=status.HTTP_400_BAD_REQUEST)

    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)
    serializer = BankBookSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        if book_type == 'stock':
            serializer.save(user=request.user)

        else:
            user.balance -= payment
            user.save()
            serializer.save(user=request.user, balance=payment)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='DELETE', request_body=PasswordSerializer)
@api_view(['DELETE'])
def delete(request, book_type):
    name = request.data.get('name')
    birthday = request.data.get('birthday')
    book_password = request.data.get('book_password')
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)
    book = get_object_or_404(BankBook, user=user, book_type=book_type)

    if user.name == name and user.birthday == birthday and user.book_password == book_password:
        user.balance += book.balance
        user.save()
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    else:
        return Response({'error: 본인 인증 실패'}, status=status.HTTP_401_UNAUTHORIZED)
