from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = '__all__'


class SignupSerializer(UserSerializer):
    username = serializers.CharField(min_length=4, max_length=16)
    password = serializers.CharField(min_length=8, max_length=20, write_only=True)
    password_confirm = password

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'password_confirm', 'name', 'birthday', )


class CheckSerializer(UserSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', )
