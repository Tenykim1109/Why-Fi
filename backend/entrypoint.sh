#!/bin/bash

pip install --upgrade pip

pip install -r requirements.txt

python manage.py migrate --noinput

python manage.py collectstatic --noinput

gunicorn --bind 0.0.0.0:8000 config.wsgi:application --workers 4 --threads 4
