# Generated by Django 3.1.5 on 2021-05-22 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('item', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('quantity', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]
