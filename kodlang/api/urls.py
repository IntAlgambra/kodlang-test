from django.urls import path
from .views import Articles

app_name = 'api'

urlpatterns = [
    path('articles/', Articles.as_view()),
]