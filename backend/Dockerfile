FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /app/backend

COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . ./
EXPOSE 8000

# RUN chmod +x ./entrypoint.sh
# ENTRYPOINT ["./entrypoint.sh"]
