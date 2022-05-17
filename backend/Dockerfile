FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /web

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
