from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    SignupSerializer,
    CheckSerializer,
)
import random, re


def make_numbers():
    numbers = '0123456789'
    make_number = ''

    for _ in range(10):
        make_number += random.choice(numbers)
    return make_number


@api_view(['GET'])
@permission_classes([AllowAny])
def idcheck(request, username):
    User = get_user_model()

    if User.objects.filter(username=username):
        return Response({'error: ID 중복'}, status=status.HTTP_400_BAD_REQUEST)
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

    if User.objects.filter(name=name, birthday=birthday):
        return Response({'error: 이미 가입'}, status=status.HTTP_400_BAD_REQUEST)

    if not (re.findall('[a-zA-Z]+', name)) or re.findall('[0-9]+', name) or re.findall('[{-~[-`:-@!-/]+', name):
        return Response({'error: 이름 형식 오류'}, status=status.HTTP_400_BAD_REQUEST)

    if not (4 <= len(username) <= 16) or re.findall('[{-~[-`:-@!-/]+', username):
        return Response({'error: ID 형식 오류'}, status=status.HTTP_400_BAD_REQUEST)

    if password != password_confirm:
        return Response({'error: 비밀번호와 비밀번호 확인이 다름'}, status=status.HTTP_400_BAD_REQUEST)

    if not (8 <= len(password) <= 20 and re.findall('[a-z]+', password) and re.findall('[A-Z]+', password) and \
        re.findall('[0-9]+', password) and re.findall('[{-~[-`:-@!-/]+', password)):
        return Response({'error: 비밀번호 형식 오류'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        while True:
            numbers = make_numbers()

            if not User.objects.filter(book_number=numbers):
                break

        user = serializer.save(book_number=numbers)
        user.set_password(password)
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='DELETE', request_body=CheckSerializer)
@api_view(['DELETE'])
def delete(request):
    pass


@api_view(['GET'])
def self(request):
    pass


@api_view(['GET'])
def profile(request, username):
    pass
