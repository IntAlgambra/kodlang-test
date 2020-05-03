from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Article

import json

def format_time_posted(t):
    return '{}.{}.{} at {}-{}'.format(t.day, t.month, t.year, t.hour, t.minute)


def format_articles(articles_query):
    data = []
    for article in articles_query:
        article_data = {
            'title': article.title,
            'text': article.body,
            'timePosted': format_time_posted(article.time_posted),
            'imagePath': article.image.url.split('/')[-1]
        }
        data.append(article_data)
    return json.dumps(data)

class Articles(APIView):

    def get(self, request):
        articles = Article.objects.order_by('-time_posted')[:10]
        return Response(format_articles(articles))

    def post(self, request):
        article_data = request.data
        new_article = Article(
            title = article_data['title'],
            body = article_data['text'],
            image = article_data['file']
        )
        new_article.save()
        return Response({'Received': 'True'})

