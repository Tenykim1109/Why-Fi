from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'balance', 'book_number', )


class SignupSerializer(UserSerializer):
    username = serializers.CharField(min_length=4, max_length=16)
    password = serializers.CharField(min_length=8, max_length=20, write_only=True)
    password_confirm = password

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'password_confirm', 'name', 'birthday', )


class PasswordSerializer(UserSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', )


class SelfcheckSerializer(UserSerializer):

    class Meta:
        model = get_user_model()
        fields = ('name', 'birthday', )


class SetpasswordSerializer(UserSerializer):
    
    class Meta:
        model = get_user_model()
        fields = ('book_password', )


class RemittanceSerializer(UserSerializer):
    money = serializers.IntegerField()
    
    class Meta:
        model = get_user_model()
        fields = ('book_number', 'book_password', 'money', )
