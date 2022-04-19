from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views


urlpatterns = [
    path('signin/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('idcheck/<username>/', views.idcheck),
    path('signpu/', views.signup),
    path('delete/', views.delete),
    path('profile/<username>/', views.profile),
]
