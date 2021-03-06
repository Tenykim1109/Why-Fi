from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    # TokenRefreshView,
    # TokenVerifyView,
)
from . import views


urlpatterns = [
    path('signin/', TokenObtainPairView.as_view()),
    # path('refresh/', TokenRefreshView.as_view()),
    # path('verify/', TokenVerifyView.as_view()),
    path('idcheck/<username>/', views.idcheck),
    path('signup/', views.signup),
    path('delete/', views.delete),
    path('tutorialcheck/', views.tutorialcheck),
    path('self/', views.self),
    path('profile/<username>/', views.profile),
    path('selfcheck/', views.selfcheck),
    path('setpassword/', views.setpassword),
    path('bookcheck/<book_number>/', views.bookcheck),
    path('remittance/', views.remittance),
]
