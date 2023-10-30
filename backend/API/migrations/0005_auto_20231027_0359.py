# Generated by Django 3.2.22 on 2023-10-27 08:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_auto_20231025_0202'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='estudiantes',
            name='procedencia',
        ),
        migrations.RemoveField(
            model_name='inscripciones',
            name='descripcion',
        ),
        migrations.RemoveField(
            model_name='inscripciones',
            name='respondable',
        ),
        migrations.AlterField(
            model_name='inscripciones',
            name='aprobado',
            field=models.BooleanField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='personas',
            name='telefono',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='RepresentanteEstudiante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estudiante', models.ForeignKey(db_column='estudiante_id', on_delete=django.db.models.deletion.CASCADE, related_name='representantes', to='API.estudiantes')),
                ('parentesco', models.ForeignKey(db_column='parentesco_id', on_delete=django.db.models.deletion.CASCADE, related_name='representantes', to='API.parentescos')),
                ('representante', models.ForeignKey(db_column='representante_id', on_delete=django.db.models.deletion.CASCADE, related_name='representantes', to='API.representantes')),
            ],
        ),
    ]