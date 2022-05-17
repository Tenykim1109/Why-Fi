#!/bin/sh

until ./manage.py migrate
do
    echo "Waiting for do to be ready..."
    sleep 2
done

./manage.py collectstatic --noinput

gunicorn config.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4
