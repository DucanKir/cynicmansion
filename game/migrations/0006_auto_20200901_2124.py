# Generated by Django 3.1.1 on 2020-09-01 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0005_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='url',
        ),
        migrations.AddField(
            model_name='image',
            name='data',
            field=models.BinaryField(default=b'', max_length=10000000),
        ),
    ]