# Kodlang test app

## About
Путь к странице добавления статьи: addArticle (не нашел в макете навигации на эту страницу)

Приложение сделано в формате SPA (по хорошему, стоило бы его пересобрать на Vue с правильным роутингом, но не успел.) Весь фронт собирается автоматически вебпаком из папки frontend.

## Prerequisites

Needed: Python3, virtualenv, postgres

## Installing

Clone repository:

```
git clone https://github.com/IntAlgambra/kodlang-test.git
```

Set up virtual enviroment (windows version)

```
cd kodlang-test

virtualenv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Set up Postgres: create database, change database settings in ./kodlang/settings.py (user, password and other stuff)

apply migrations and load test data:

```
cd kodlang

python manage.py makemigrations

python manage.py migrate

python manage.py loaddata dump.json
```

start dev server:

```
python manage.py runserver
```
