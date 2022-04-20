# Generated by Django 4.0.4 on 2022-04-20 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=200)),
                ('answer', models.CharField(max_length=2)),
                ('commentary', models.CharField(max_length=200)),
                ('quiz_type', models.CharField(choices=[('ox', 'OX'), ('choices', '객관식')], max_length=10)),
                ('choices_view1', models.CharField(blank=True, max_length=100)),
                ('choices_view2', models.CharField(blank=True, max_length=100)),
                ('choices_view3', models.CharField(blank=True, max_length=100)),
                ('choices_view4', models.CharField(blank=True, max_length=100)),
            ],
        ),
    ]
