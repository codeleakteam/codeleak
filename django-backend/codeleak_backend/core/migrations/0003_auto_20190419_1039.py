# Generated by Django 2.2 on 2019-04-19 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20190416_1702'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='description',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tag',
            name='title',
            field=models.CharField(default='', max_length=70),
        ),
    ]