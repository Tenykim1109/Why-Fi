from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    UserSerializer,
    SignupSerializer,
    CheckSerializer,
    PasswordSerializer,
    RemittanceSerializer,
)
import random, re, datetime


def make_number():
    numbers = '0123456789'
    make_numbers = ''

    for _ in range(10):
        make_numbers += random.choice(numbers)

    return make_numbers


@api_view(['GET'])
@permission_classes([AllowAny])
def idcheck(request, username):
    User = get_user_model()

    if User.objects.filter(username=username).exists():
        return Response({'error: ID 중복'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(status=status.HTTP_200_OK)


@swagger_auto_schema(method='POST', request_body=SignupSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    name = request.data.get('name')
    birthday = request.data.get('birthday')
    username = request.data.get('username')
    password = request.data.get('password')
    password_confirm = request.data.get('password_confirm')
    User = get_user_model()

    if User.objects.filter(name=name, birthday=birthday).exists():
        return Response({'error: 이미 가입'}, status=status.HTTP_400_BAD_REQUEST)

    if re.findall('[0-9]+', name) or re.findall('[{-~[-`:-@!-/]+', name):
        return Response({'error: 이름 형식 오류'}, status=status.HTTP_400_BAD_REQUEST)

    if datetime.date.fromisoformat(birthday) > datetime.date.today():
        return Response({'error: 잘못된 생일 입력'}, status=status.HTTP_400_BAD_REQUEST)

    if not (4 <= len(username) <= 16) or re.findall('[{-~[-`:-@!-/]+', username):
        return Response({'error: ID 형식 오류'}, status=status.HTTP_400_BAD_REQUEST)

    if password != password_confirm:
        return Response({'error: 비밀번호와 비밀번호 확인이 다름'}, status=status.HTTP_400_BAD_REQUEST)

    if not (8 <= len(password) <= 20 and re.findall('[a-zA-Z]+', password) and re.findall('[0-9]+', password)):
        return Response({'error: 비밀번호 형식 오류'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        while True:
            numbers = make_number()

            if not User.objects.filter(book_number=numbers).exists():
                break

        user = serializer.save(book_number=numbers)
        user.set_password(password)
        user.save()
        return Response(status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='DELETE', request_body=CheckSerializer)
@api_view(['DELETE'])
def delete(request):
    User = get_user_model()
    user = get_object_or_404(User, username=request.data['username'])

    if user == request.user and user.check_password(request.data.get('password')):
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    else:
        return Response({'error: 본인 인증 실패'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def self(request):
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def profile(request, username):
    User = get_user_model()
    user = get_object_or_404(User, username=username)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@swagger_auto_schema(method='PUT', request_body=PasswordSerializer)
@api_view(['PUT'])
def setpassword(request):
    name = request.data.get('name')
    birthday = request.data.get('birthday')
    book_password = request.data.get('book_password')
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)

    if len(book_password) != 4 or re.findall('[a-zA-Z]+', book_password) or re.findall('[{-~[-`:-@!-/]+', book_password):
        return Response({'error: 통장 비밀번호 형식 오류'}, status=status.HTTP_400_BAD_REQUEST)

    if user.name == name and user.birthday == datetime.date.fromisoformat(birthday):
        serializer = PasswordSerializer(user, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

    else:
        return Response({'error: 본인 인증 실패'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def bookcheck(request, book_number):
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)

    if User.objects.filter(book_number=book_number).exists() and user.book_number != book_number:
        other_user = get_object_or_404(User, book_number=book_number)
        return Response({other_user.name})

    else:
        return Response({'error: 잘못된 계좌번호 입력'}, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='POST', request_body=RemittanceSerializer)
@api_view(['POST'])
def remittance(request):
    book_number = request.data.get('book_number')
    book_password = request.data.get('book_password')
    money = int(request.data.get('money'))
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)

    if not User.objects.filter(book_number=book_number).exists() or user.book_number == book_number:
        return Response({'error: 잘못된 계좌번호 입력'}, status=status.HTTP_400_BAD_REQUEST)

    if money <= 0 or user.balance < money:
        return Response({'error: 잘못된 송금 금액 입력'}, status=status.HTTP_400_BAD_REQUEST)

    if user.book_password == book_password:
        user.balance -= money
        user.save()
        other_user = get_object_or_404(User, book_number=book_number)
        other_user.balance += money
        other_user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)

    else:
        return Response({'error: 본인 인증 실패'}, status=status.HTTP_401_UNAUTHORIZED)
