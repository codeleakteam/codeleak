# Generated by Django 2.2 on 2019-05-06 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20190427_1555'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='viewed_times',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='answercomment',
            name='content',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='questioncomment',
            name='content',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]