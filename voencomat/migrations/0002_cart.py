# Generated by Django 4.1.3 on 2022-12-11 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voencomat', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('surname', models.CharField(max_length=30)),
                ('vozrast', models.IntegerField()),
                ('categoriya', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cart',
                'managed': False,
            },
        ),
    ]
