# Generated by Django 2.2.6 on 2019-10-18 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='position',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
