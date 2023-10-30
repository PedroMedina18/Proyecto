from django.db import models

# Create your models here.
# class Profesiones(models.Model):
#     profesion = models.CharField(max_length=100, unique=True)
#     descripcion = models.CharField(max_length=1000, null=True, blank=True)

#     class Meta:
#         db_table="profesiones"

# # -----------------------------------------------------------------------------------------------------------------

class Generos(models.Model):
    genero = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        db_table="generos"

class Personas(models.Model):
    nombres = models.CharField(max_length=100, default="Pedro Medina")
    apellidos = models.CharField(max_length=100, default="Medina Nazareth")
    nacionalidad = models.BooleanField()
    cedula = models.BigIntegerField(unique=True)
    propia = models.BooleanField(default=True)
    genero = models.ForeignKey(Generos, on_delete=models.CASCADE, related_name="persona", db_column="genero_id")
    fecha_nacimiento = models.DateField(null=True, blank=True)
    telefono = models.BigIntegerField(null=True, blank=True)
    correo = models.EmailField(null=True, blank=True, max_length=100)
    fechaRegistro = models.DateTimeField(auto_now_add=True, db_column="fecha_registro")
    fechaActualizacion = models.DateTimeField(auto_now=True, db_column="fecha_actualizacion")

    class Meta:
        db_table="personas"

# # -----------------------------------------------------------------------------------------------------------------

class Representantes(models.Model):
    persona = models.OneToOneField(Personas, on_delete=models.CASCADE, related_name="representante", db_column="persona_id")
    telefono = models.BigIntegerField(null=True, blank=True)
    fallecido = models.BooleanField(default=False)
    profesion = models.CharField(max_length=200, null=True, blank=True)
    fechaRegistro = models.DateTimeField(auto_now_add=True, db_column="fecha_registro")
    fechaActualizacion = models.DateTimeField(auto_now=True, db_column="fecha_actualizacion")

    class Meta:
        db_table="representantes"

# # -----------------------------------------------------------------------------------------------------------------

# class RepresentanteProfesion(models.Model):
#     representante = models.ForeignKey(Representantes, on_delete=models.CASCADE)
#     profesion = models.ForeignKey(Profesiones, on_delete=models.CASCADE)
    
#     class Meta:
#         db_table="representantes_has_profesiones"


# # -----------------------------------------------------------------------------------------------------------------

# class Padecimientos(models.Model):
#     padecimiento = models.CharField(max_length=100, unique=True)
#     descripcion = models.CharField(max_length=1000, null=True, blank=True)

#     class Meta:
#         db_table="padecimientos"

# # -----------------------------------------------------------------------------------------------------------------

class Parentescos(models.Model):
    parentesco = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        db_table="parentescos"

# # -----------------------------------------------------------------------------------------------------------------

class AñoEscolar(models.Model):
    AñoInicio=models.DateField(auto_now=False, auto_now_add=False, db_column="año_inicio")
    Añofinal=models.DateField(auto_now=False, auto_now_add=False, db_column="año_final")
    actual=models.BooleanField()

    class Meta:
        db_table="año_escolar"

# # -----------------------------------------------------------------------------------------------------------------
class Secciones(models.Model):
    nombre=models.CharField(max_length=2, unique=True)

    class Meta:
        db_table="secciones"

# # -----------------------------------------------------------------------------------------------------------------
class AñoEscolarizacion(models.Model):
    año=models.IntegerField(unique=True)

    class Meta:
        db_table="año_escolarizacion"

# # -----------------------------------------------------------------------------------------------------------------

class AñoEscolarizacionSeccionesAñoEscolar(models.Model):
    año=models.ForeignKey(AñoEscolarizacion, on_delete=models.CASCADE )
    seccion=models.ForeignKey(Secciones, on_delete=models.CASCADE )
    añoEscolar=models.ForeignKey(AñoEscolar, on_delete=models.CASCADE, db_column="año_escolar_id")
    
    class Meta:
        db_table="año_escolarizacion_has_secciones_año_escolar"

# # -----------------------------------------------------------------------------------------------------------------

class NombreMaterias(models.Model):
    nombre=models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)
    
    class Meta:
        db_table="Nombres_Materias"

# # -----------------------------------------------------------------------------------------------------------------

class Materias(models.Model):
    nombre=models.ForeignKey(NombreMaterias, on_delete=models.CASCADE)
    año=models.ForeignKey(AñoEscolarizacion, on_delete=models.CASCADE)
    obligatoria=models.BooleanField(default=True)
    tipoNota=models.BooleanField(default=True, db_column="tipo_nota")
    
    class Meta:
        db_table="Materias"

# # -----------------------------------------------------------------------------------------------------------------

class Cargos(models.Model):
    nombre=models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        db_table="cargos"
# # -----------------------------------------------------------------------------------------------------------------

class Personal(models.Model):
    persona = models.OneToOneField(Personas, on_delete=models.CASCADE, related_name="personal", db_column="persona_id")
    usuario = models.CharField(max_length=20, unique=True)
    contraseña = models.CharField(max_length=500)
    inhabilitado = models.BooleanField(default=False)
    cargo = models.ForeignKey(Cargos, on_delete=models.CASCADE, related_name="personal", db_column="cargo_id")
    fechaRegistro = models.DateTimeField(auto_now_add=True, db_column="fecha_registro")
    fechaActualizacion = models.DateTimeField(auto_now=True, db_column="fecha_actualizacion")

    class Meta:
        db_table="personal"

# # -----------------------------------------------------------------------------------------------------------------

class EstadosEstudiantee(models.Model):
    nombre=models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        db_table="estado_estudiante"
# # -----------------------------------------------------------------------------------------------------------------

class Estudiantes(models.Model):
    persona = models.OneToOneField(Personas, on_delete=models.CASCADE, related_name="estudiante", db_column="persona_id")
    lugarNacimiento = models.CharField(max_length=100, db_column="lugar_nacimiento")
    direccion = models.CharField(max_length=250, db_column="direccion_habitacional")
    observaciones = models.CharField(max_length=1000, null=True, blank=True)
    añoIngreso = models.ForeignKey(AñoEscolarizacion, on_delete=models.CASCADE, related_name="estudiante", db_column="año_ingreso_id")
    fechaRegistro = models.DateTimeField(auto_now_add=True, db_column="fecha_registro")
    fechaActualizacion = models.DateTimeField(auto_now=True, db_column="fecha_actualizacion")
    estado = models.ForeignKey(EstadosEstudiantee, on_delete=models.CASCADE, db_column="estado_id")

    class Meta:
        db_table="estudiantes"

# # -----------------------------------------------------------------------------------------------------------------

class Requisitos(models.Model):
    estudiante = models.OneToOneField(Estudiantes, on_delete=models.CASCADE, related_name="requisitos", db_column="estudiante_id")
    certificadoNotas = models.BooleanField(db_column="certificado_notas")
    boletaPromocion = models.BooleanField(db_column="boleta_promocion")
    cartaConducta = models.BooleanField(db_column="carta_buena_conducta")
    fotosEstudiante = models.BooleanField(db_column="fotos_estudiante")
    fotosRepresentante = models.BooleanField(db_column="fotos_representante")
    fotocopiaCedulaEstudiante = models.BooleanField(db_column="fotocopia_cedula_estudiante")
    fotocopiaCedulaRepresentante = models.BooleanField(db_column="fotocopia_cedula_representante")
    partidaNacimiento = models.BooleanField(db_column="partida_nacimiento")
    fechaRegistro = models.DateTimeField(auto_now_add=True, db_column="fecha_registro")
    fechaActualizacion = models.DateTimeField(auto_now=True, db_column="fecha_actualizacion")

    class Meta:
        db_table="requisitos"

# # -----------------------------------------------------------------------------------------------------------------

class NotasMaterias(models.Model):
    estudiante = models.ForeignKey(Estudiantes, on_delete=models.CASCADE, related_name="notas", db_column="estudiante_id")
    materia = models.ForeignKey(Materias, on_delete=models.CASCADE, related_name="notas", db_column="materia_id")
    nota = models.IntegerField()

    class Meta:
        db_table="notas_materias"

# # -----------------------------------------------------------------------------------------------------------------

class TipoInscripciones(models.Model):
    nombre=models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        db_table="tipo_inscripciones"

# # -----------------------------------------------------------------------------------------------------------------
class Inscripciones(models.Model):
    estudiante = models.ForeignKey(Estudiantes, on_delete=models.CASCADE, related_name="inscripcion", db_column="estudiante_id")
    tipoInscripcion = models.ForeignKey(TipoInscripciones, on_delete=models.CASCADE, related_name="inscripcion", db_column="tipo_inscripcion_id")
    fechaRegistro = models.DateTimeField(auto_now_add=True, db_column="fecha_registro")
    fechaActualizacion = models.DateTimeField(auto_now=True, db_column="fecha_actualizacion")
    aprobado = models.BooleanField(null=True, blank=True, default=None)
    seccionAño = models.ForeignKey(AñoEscolarizacionSeccionesAñoEscolar, on_delete=models.CASCADE, related_name="inscripcion", db_column="seccion_año_id")
    representanteLegal = models.ForeignKey(Representantes, on_delete=models.CASCADE, related_name="inscripcion", db_column="representante_legal_id")
    parentesco = models.ForeignKey(Parentescos, on_delete=models.CASCADE, related_name="inscripcion", db_column="parentesco_id")

    class Meta:
        db_table="inscripciones"

class MateriasInscripcion(models.Model):
    materia = models.ForeignKey(Materias, on_delete=models.CASCADE, related_name="matrias_inscripcion", db_column="materia_id")
    inscripcion = models.ForeignKey(Inscripciones, on_delete=models.CASCADE, related_name="matrias_inscripcion", db_column="inscripcion_id")
    nota = models.IntegerField(default=0)

    class Meta:
        db_table="materias_has_inscripcion"

class RepresentanteEstudiante(models.Model):
    estudiante=models.ForeignKey(Estudiantes, on_delete=models.CASCADE, related_name="representantes", db_column="estudiante_id")
    representante = models.ForeignKey(Representantes, on_delete=models.CASCADE, related_name="representantes", db_column="representante_id")
    parentesco = models.ForeignKey(Parentescos, on_delete=models.CASCADE, related_name="representantes", db_column="parentesco_id")

    class Meta:
        db_table="representantes_has_estudiantes"