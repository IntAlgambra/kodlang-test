from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('addArticle', views.index, name='add_article'),
]