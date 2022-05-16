FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /web

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]
