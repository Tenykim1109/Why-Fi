from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="Why-Fi API",
      default_version="v1",
      description="Why-Fi를 위한 API 문서",
      terms_of_service="https://www.notion.so/API-6b57e85836b040e4a36b6e53564fe21a",
   ),
   public=True,
   permission_classes=(permissions.AllowAny, ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/bankbooks/', include('bankbooks.urls')),
    path('api/quiz/', include('quiz.urls')),
]

if settings.DEBUG:
   urlpatterns += [
      re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
      re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
      re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   ]
