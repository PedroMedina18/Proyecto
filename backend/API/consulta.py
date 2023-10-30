from .models import Generos
from django.http.response import JsonResponse
from django.db import IntegrityError, connection
from .models import Personas, Representantes, Generos
from datetime import datetime 

# def buscar_profesiones():
#     try:
#         cursor=connection.cursor()
#         query="SELECT * FROM profesiones ORDER BY id ASC;"
#         cursor.execute(query)
#         profesiones = dictfetchall(cursor)
#         if len(profesiones) > 0:
#             datos = {"status": True, 'message': "Exito", 'result': profesiones}
#         else:
#             datos = {"status": False, 'message': "Profesiones no Encontrado", 'result': None}
#         return (datos)
#     except Exception as ex:
#         print("Error", ex)
#         cursor.close()
#         connection.close()
#         datos = {"status": False, 'message': "Error de Servidor", 'result': None}
#         return (datos)
#     finally:
#         cursor.close()
#         connection.close()

def buscar_generos():
    try:
        cursor=connection.cursor()
        query="SELECT * FROM generos ORDER BY id ASC;"
        cursor.execute(query)
        generos = dictfetchall(cursor)
        if len(generos) > 0:
            datos = {"status": True, 'message': "Exito", 'result': generos}
        else:
            datos = {"status": False, 'message': "Generos no Encontrado", 'result': None}
        return (datos)
    except Exception as ex:
        print("Error", ex)
        datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    finally:
        cursor.close()
        connection.close()

def buscar_parentescos():
    try:
        cursor=connection.cursor()
        query="SELECT * FROM parentescos ORDER BY id ASC;"
        cursor.execute(query)
        parentescos = dictfetchall(cursor)
        if len(parentescos) > 0:
            datos = {"status": True, 'message': "Exito", 'result': parentescos}
        else:
            datos = {"status": False, 'message': "Parentescos no Encontrado", 'result': None}
        return (datos)
    except Exception as ex:
        print("Error", ex)
        datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    finally:
        cursor.close()
        connection.close()

# def buscar_padecimientos():
#     try:
#         cursor=connection.cursor()
#         query="SELECT * FROM padecimientos ORDER BY id ASC;"
#         cursor.execute(query)
#         padecimientos = dictfetchall(cursor)
#         if len(padecimientos) > 0:
#             datos = {"status": True, 'message': "Exito", 'result': padecimientos}
#         else:
#             datos = {"status": False, 'message': "Padecimientos no Encontrado", 'result': None}
#         return (datos)
#     except Exception as ex:
#         print("Error", ex)
#         cursor.close()
#         connection.close()
#         datos = {"status": False, 'message': "Error de Servidor", 'result': None}
#         return (datos)
#     finally:
#         cursor.close()
#         connection.close()

def buscar_representante():
    try:
        cursor=connection.cursor()
        query="SELECT * FROM generos ORDER BY id ASC;"
        cursor.execute(query)
        generos = dictfetchall(cursor)
        if len(generos) > 0:
            datos = {"status": True, 'message': "Exito", 'result': generos}
        else:
            datos = {"status": False, 'message': "Generos no Encontrado", 'result': None}
        return (datos)
    except Exception as ex:
        print("Error", ex)
        datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    finally:
        cursor.close()
        connection.close()

def buscar_materias(año):
    try:
        cursor=connection.cursor()
        query="""
        SELECT mat.id, nom.nombre FROM materias mat
        LEFT JOIN nombres_materias nom ON mat.nombre_id = nom.id
        WHERE mat.año_id=%s;
        """
        cursor.execute(query, [int(año)])
        materias = dictfetchall(cursor)
        if len(materias) > 0:
            datos = {"status": True, 'message': "Exito", 'result': materias}
        else:
            datos = {"status": False, 'message': "Materias no Encontrado", 'result': None}
        return (datos)
    except Exception as ex:
        print("Error", ex)
        datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    finally:
        cursor.close()
        connection.close()

def buscar_secciones(añoEscolar, añoEscolarizacion):
    try:
        cursor=connection.cursor()
        query="""
        SELECT ase.id, año.año, se.nombre AS seccion FROM año_escolarizacion_has_secciones_año_escolar ase
        LEFT JOIN secciones se ON ase.seccion_id = se.id
        LEFT JOIN año_escolarizacion año ON ase.año_id = año.id
        WHERE ase.año_escolar_id=%s AND ase.año_id=%s;
        """
        cursor.execute(query, [int(añoEscolar), int(añoEscolarizacion)])
        secciones = dictfetchall(cursor)
        if len(secciones) > 0:
            datos = {"status": True, 'message': "Exito", 'result': secciones}
        else:
            datos = {"status": False, 'message': "Secciones no Encontrado", 'result': None}
        return (datos)
    except Exception as ex:
        print("Error", ex)
        datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    finally:
        cursor.close()
        connection.close()

def periodo_actual():
    try:
        cursor=connection.cursor()
        query="""
        SELECT id, CONCAT(YEAR(año_inicio), '-', YEAR(año_final)) AS periodo FROM año_escolar 
        WHERE actual=1;
        """
        cursor.execute(query)
        año = dictfetchall(cursor)
        if len(año) > 0:
            datos = {"status": True, 'message': "Exito", 'result': año[0]}
        else:
            datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    except Exception as ex:
        print("Error", ex)
        datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    finally:
        cursor.close()
        connection.close()

def años(año=None):
    try:
        cursor=connection.cursor()
        if(año==None):
            query="""
            SELECT id, año FROM año_escolarizacion;
            """
            cursor.execute(query)
            años = dictfetchall(cursor)
            if len(años) > 0:
                datos = {"status": True, 'message': "Exito", 'result': años}
            else:
                datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        else:
            query="""
            SELECT id, año FROM año_escolarizacion WHERE año_escolarizacion.id= %s;
            """
            cursor.execute(query, [int(año)])
            años = dictfetchall(cursor)
            if len(años) > 0:
                datos = {"status": True, 'message': "Exito", 'result': años[0]}
            else:
                datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    except Exception as ex:
        print("Error", ex)
        datos = {"status": False, 'message': "Error de Servidor", 'result': None}
        return (datos)
    finally:
        cursor.close()
        connection.close()

def consultaCedula(cedula):
    try:
        cursor=connection.cursor()
        query="""
            SELECT pe.id, pe.nombres, pe.apellidos FROM personas pe WHERE pe.cedula=%s;
            """
        cursor.execute(query,[int(cedula)])
        persona = dictfetchall(cursor)
        if(len(persona)>0):
            return True
        else:
            return False
    except Exception as ex:
        print("Error", ex)
        return True
    finally:
        cursor.close()
        connection.close()

def registrarRepresentante(datos):
    try:
        if(datos.get("id")==None):
            generoId=Generos.objects.get(id=datos["genero"])
            Personas.objects.create(nombres=datos["nombres"], apellidos=datos["apellidos"], cedula=int(datos["cedula"]), nacionalidad=datos["nacionalidad"], genero=generoId, fecha_nacimiento=datos["fecha_nacimiento"], correo=datos["correo"], telefono=int(datos["telefono"]))
            persona=Personas.objects.get(nombres=datos["nombres"], apellidos=datos["apellidos"], cedula=int(datos["cedula"]))
            Representantes.objects.create(persona=persona, telefono=int(datos["telefono_alterno"]), fallecido=datos["fallecido"], profesion=datos["profesion"])
            representante=Representantes.objects.get(persona=persona)
            datos={"status":True, "case":1, "representante":representante}
            return datos
        else:
            representante=Representantes.objects.get(id=datos["id"])
            datos={"status":True, "case":2, "representante":representante}
            return datos

    except:
        datos={"status":False}
        return datos

def cedulaEstudiantil(id, fecha):
    try:
        representante=Representantes.objects.get(id=id)
        cursor=connection.cursor()
        query="""
            SELECT COUNT(pe.id) AS coincidencias FROM personas pe WHERE pe.cedula LIKE %s;
            """
        cursor.execute(query,[representante.persona.cedula])
        coincidencias = dictfetchall(cursor)
        año=datetime.strptime(fecha, '%Y-%m-%d')
        cedula=f"{representante.persona.cedula}{año.year}{coincidencias[0]['coincidencias']}"
        return int(cedula)
    except Exception as ex:
        print("Error", ex)
        
    finally:
        cursor.close()
        connection.close()



# funcion para retornar un diccionario con los campos
def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]