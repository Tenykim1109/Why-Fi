# Generated by Django 4.0.4 on 2022-05-12 06:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('situation', models.IntegerField(default=0)),
                ('current_price', models.IntegerField()),
                ('created_at', models.DateField(auto_now_add=True)),
                ('stock_type', models.CharField(choices=[('A', '엔터'), ('B', '제조'), ('C', '제약')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='StockSituation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('change', models.IntegerField()),
                ('article', models.CharField(max_length=200)),
                ('stock_type', models.CharField(choices=[('A', '엔터'), ('B', '제조'), ('C', '제약')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='MyStock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_price', models.IntegerField()),
                ('stocks', models.IntegerField()),
                ('stock_type', models.CharField(choices=[('A', '엔터'), ('B', '제조'), ('C', '제약')], max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BankBook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('balance', models.BigIntegerField(default=0)),
                ('payment', models.BigIntegerField()),
                ('interest', models.BigIntegerField(default=0)),
                ('deadline', models.DateField()),
                ('created_at', models.DateField(auto_now_add=True)),
                ('book_type', models.CharField(choices=[('deposit', '예금'), ('savings', '적금')], max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
