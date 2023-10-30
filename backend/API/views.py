from django.shortcuts import render
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from .models import Generos, Parentescos, Personal,Personas,Representantes, Estudiantes, Cargos, AñoEscolarizacion, EstadosEstudiantee, Inscripciones, TipoInscripciones, AñoEscolarizacionSeccionesAñoEscolar, Requisitos, RepresentanteEstudiante, Materias, MateriasInscripcion, NotasMaterias
from django.db import IntegrityError, connection
import json
from django.core.serializers import serialize
from datetime import datetime
from django.utils import timezone
from .consulta import  buscar_generos, buscar_parentescos, buscar_secciones, periodo_actual, buscar_materias, años, consultaCedula, cedulaEstudiantil
from .funtions import determinar_valor, edit_str, antecedores
from .token import encriptado_constraseña, desencriptado_contraseña, new_token
# Create your views here.


class Generos_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # Funcion para el registro de los Generos
    def post(self, request):
        try:
            jd = json.loads(request.body)
            Generos.objects.create(
                genero=jd['genero'].title())
            datos = {"status":True,'message': "Registro Completado"}
            return JsonResponse(datos)
        except Exception as ex:
            print(ex)
            datos = {
                "status": False,
                'message': "Error. Compruebe Datos y asegurese de que no sean repetidos"
            }
            return JsonResponse(datos)

    def get(self, request):
        generos=buscar_generos()
        if (generos["status"]):
            datos={"status": True, 'message': "Exito", "result": generos["result"]}
        else:
            datos={"status": False, 'message': "Error de Servidor", "result":None}
        return JsonResponse(datos)

# class Profesiones_views(View):
#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kwargs):
#         return super().dispatch(request, *args, **kwargs)

#     # Funcion para el registro de los Generos
#     def post(self, request):
#         try:
#             jd = json.loads(request.body)
#             Profesiones.objects.create(
#                 profesion=jd['profesion'].title(), descripcion=jd['descripcion'])
#             datos = {"status":True,'message': "Registro Completado"}
#             return JsonResponse(datos)
#         except Exception as ex:
#             print(ex)
#             datos = {
#                 "status": False,
#                 'message': "Error. Compruebe Datos y asegurese de que no sean repetidos"
#             }
#             return JsonResponse(datos)
    
#     def get(self, request):
#         profesiones=buscar_profesiones()
#         if (profesiones["status"]):
#             datos={"status": True, 'message': "Exito", "result": profesiones["result"]}
#         else:
#             datos={"status": False, 'message': "Error de Servidor", "result":None}
#         return JsonResponse(datos)

# class Padecimientos_views(View):
#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kwargs):
#         return super().dispatch(request, *args, **kwargs)

#     # Funcion para el registro de los Padecimientos
#     def post(self, request):
#         try:
#             jd = json.loads(request.body)
#             Padecimientos.objects.create(padecimiento=jd['padecimiento'].title(), descripcion=jd['descripcion'])
#             datos = {"status":True,'message': "Registro Completado"}
#             return JsonResponse(datos)
#         except Exception as ex:
#             print(ex)
#             datos = {
#                 "status": False,
#                 'message': "Error. Compruebe Datos y asegurese de que no sean repetidos"
#             }
#             return JsonResponse(datos)

#     def get(self, request):
#         padecimientos=buscar_padecimientos()
#         if (padecimientos["status"]):
#             datos={"status": True, 'message': "Exito", "result": padecimientos["result"]}
#         else:
#             datos={"status": False, 'message': "Error de Servidor", "result":None}
#         return JsonResponse(datos)

class Parentescos_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # Funcion para el registro de Parentescos
    def post(self, request):
        try:
            jd = json.loads(request.body)
            Parentescos.objects.create(parentesco=jd['parentesco'].title())
            datos = {"status":True,'message': "Registro Completado"}
            return JsonResponse(datos)
        except Exception as ex:
            print(ex)
            datos = {
                "status": False,
                'message': "Error. Compruebe Datos y asegurese de que no sean repetidos"
            }
            return JsonResponse(datos)

    def get(self, request):
        parentescos=buscar_parentescos()
        if (parentescos["status"]):
            datos={"status": True, 'message': "Exito", "result": parentescos["result"]}
        else:
            datos={"status": False, 'message': "Error de Servidor", "result":None}
        return JsonResponse(datos)

class Inscripcion_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        try:
            data = json.loads(request.body)
            
            estudiante=data["estudiante"]
            if(estudiante["propia"]):
                if(consultaCedula(estudiante["cedula"])):
                    datos={"status":False, "message":"Error, Cedula ya registrada"}
                    return JsonResponse(datos)

            telefono=(int(estudiante["telefono"]) if estudiante["telefono"]!="" else None)
            generoId=Generos.objects.get(id=estudiante["genero"])
            
            if(not estudiante["propia"]):
                cedula=cedulaEstudiantil(data["representante_legal"]["id"], estudiante["fecha_nacimiento"])
                nacionalidad=True
            else:
                cedula=int(estudiante["cedula"])
                nacionalidad=estudiante["nacionalidad"]
            Personas.objects.create(nombres=estudiante["nombres"].title(), apellidos=estudiante["apellidos"].title(), cedula=cedula, propia=estudiante["propia"], nacionalidad=nacionalidad, genero=generoId, fecha_nacimiento=estudiante["fecha_nacimiento"], correo=estudiante["correo"], telefono=telefono)
            persona=Personas.objects.get(cedula=cedula)
            
            # ?Registro del estudiante
            año_ingreso=AñoEscolarizacion.objects.get(id=estudiante["año_ingreso"])
            estado=EstadosEstudiantee.objects.get(id=1)
            Estudiantes.objects.create(persona=persona, lugarNacimiento=estudiante["lugar_nacimiento"].title(), direccion=estudiante["direccion_habitacional"], observaciones=estudiante["observaciones"], añoIngreso=año_ingreso, estado=estado)
            new_estudiante=Estudiantes.objects.get(persona=persona)

            # ?Inscripcion
            tipo_inscripcion=TipoInscripciones.objects.get(id=1)
            seccionAño=AñoEscolarizacionSeccionesAñoEscolar.objects.get(id=estudiante["año_seccion"])
            representanteLegal=Representantes.objects.get(id=data["representante_legal"]["id"])
            parentesco=Parentescos.objects.get(id=data["representante_legal"]["parentesco"])
            Inscripciones.objects.create(estudiante=new_estudiante, tipoInscripcion=tipo_inscripcion, seccionAño=seccionAño, representanteLegal=representanteLegal, parentesco=parentesco)
            inscripcion=Inscripciones.objects.get(estudiante=new_estudiante)

            # ?Requisitos
            requisitos=data["requisitos"]
            Requisitos.objects.create(estudiante=new_estudiante, certificadoNotas=requisitos["certificado_notas"], boletaPromocion=requisitos["boleta_promocion"], cartaConducta=requisitos["carta_buena_conducta"], fotosEstudiante=requisitos["fotos_estudiante"], fotosRepresentante=requisitos["fotos_representante"], fotocopiaCedulaEstudiante=requisitos["fotocopia_cedula_estudiante"], fotocopiaCedulaRepresentante=requisitos["fotocopia_cedula_representante"], partidaNacimiento=requisitos["partida_nacimiento"])
            
            #?Representantes
            representantes=data["representantes"]
            for representante in representantes:
                newRepresentante=Representantes.objects.get(id=representante["id"])
                newParentesco=Parentescos.objects.get(id=representante["parentesco"])
                RepresentanteEstudiante.objects.create(estudiante=new_estudiante, representante=newRepresentante, parentesco=newParentesco)
            

            #?Inscribir Materia
            materias=data["materias_inscribir"]
            for materia in materias:
                newmateria=Materias.objects.get(id=materia["id"])
                MateriasInscripcion.objects.create(inscripcion=inscripcion, materia=newmateria)
            
            #?Posibles Notas
            notas=data["notas"]
            for nota in notas:
                newmateria=Materias.objects.get(id=int(nota["id"]))
                NotasMaterias.objects.create(estudiante=new_estudiante, materia=newmateria, nota=int(nota["nota"]))
            
            
            datos={"status":True, "message":"Inscripcion completada"}
            return JsonResponse(datos)
        except Exception as ex:
            print(ex)
            datos={"status":False, "message":"Error, Verifique datos"}
            return JsonResponse(datos)

class Representante_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def post(self, request):
        try:
            data = json.loads(request.body)
            if(consultaCedula(data["cedula"])):
                datos={"status":False, "message":"Error, cedula ya registrada"}
                return JsonResponse(datos)
            generoId=Generos.objects.get(id=data["genero"])
            telefono_alterno=(int(data["telefono_alterno"]) if data["telefono_alterno"]!="" else None)
            telefono=(int(data["telefono"]) if data["telefono"]!="" else None)
            Personas.objects.create(nombres=data["nombres"].title(), apellidos=data["apellidos"].title(), cedula=int(data["cedula"]), nacionalidad=data["nacionalidad"], genero=generoId, fecha_nacimiento=data["fecha_nacimiento"], correo=data["correo"], telefono=telefono)
            persona=Personas.objects.get(nombres=data["nombres"].title(), apellidos=data["apellidos"].title(), cedula=int(data["cedula"]))
            Representantes.objects.create(persona=persona, telefono=telefono_alterno, fallecido=data["fallecido"], profesion=data["profesion"].title())
            representante=Representantes.objects.filter(persona=persona.id).values("id")
            datos={"status":True, "message":"Registro Completado", "id":representante[0]["id"]}
            datos={"status":True}
            return JsonResponse(datos)
        except Exception as ex:
            print(ex)
            datos={"status":False, "message":"Error en los Datos"}
            return JsonResponse(datos)

    def get(self, request, identificador=0):
        try:
            cursor=connection.cursor()
            if(identificador!=0):
                tipo=determinar_valor(identificador)
                if(tipo["type"]=="int"):
                    cedula_validate=str(tipo["valor"]) + "%"
                    query="""
                        SELECT re.id, pe.nombres, pe.apellidos,
                        pe.genero_id,  pe.nacionalidad, pe.cedula, re.profesion, pe.fecha_nacimiento, pe.correo, CONCAT('0',pe.telefono) as telefono, CONCAT('0',re.telefono) as telefono_alterno, re.fallecido
                        FROM representantes re 
                        LEFT JOIN personas pe ON re.persona_id = pe.id
                        WHERE pe.cedula LIKE %s ;
                    """
                    cursor.execute(query, [cedula_validate])
                    resultado=dictfetchall(cursor)
                    datos={"status": True, 'message': "Exito", "result":resultado}
                else:
                    str_validate=edit_str(tipo["valor"])
                    print(str_validate)
                    query="""
                        SELECT re.id, pe.nombres, pe.apellidos,
                        pe.genero_id,  pe.nacionalidad, pe.cedula, pe.fecha_nacimiento, pe.correo, CONCAT('0', pe.telefono) as telefono, CONCAT('0', re.telefono) as telefono_alterno, re.profesion, re.fallecido
                        FROM representantes re 
                        LEFT JOIN personas pe ON re.persona_id = pe.id
                        WHERE CONCAT(pe.nombres, ' ', pe.apellidos) LIKE %s ;
                    """
                    cursor.execute(query, [str_validate])
                    resultado=dictfetchall(cursor)
                    datos={"status": True, 'message': "Exito", "result":resultado}
            else:
                datos={"status": False, 'message': "Funcion no Creada", "result":None}
            return JsonResponse(datos)
        except Exception as ex:
            print(ex)
        finally:
            cursor.close()
            connection.close()

class AñoInscripsion_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id_añoEscolarizacion):
        periodo=periodo_actual()
        if(not periodo["status"]):
            datos={"status": False, 'message': "Error de Servidor", "result":None}
            return JsonResponse(datos)
        secciones=buscar_secciones(periodo["result"]["id"], id_añoEscolarizacion)
        if(not secciones["status"]):
            datos={"status": False, 'message': "Error de Servidor", "result":None}
            return JsonResponse(datos)
        añoInscripcion=años(id_añoEscolarizacion)
        if(not añoInscripcion["status"]):
            datos={"status": False, 'message': "Error de Servidor", "result":None}
            return JsonResponse(datos)
        añosAnteriores= antecedores(añoInscripcion["result"]["año"])
        if(añosAnteriores):
            materiasPasadas=[]
            materiasInscribir=buscar_materias(id_añoEscolarizacion)
            if(not materiasInscribir["status"]):
                    datos={"status": False, 'message': "Error de Servidor", "result":None}
                    return JsonResponse(datos)
            for año in añosAnteriores:
                materias=buscar_materias(año)
                if(not materias["status"]):
                    datos={"status": False, 'message': "Error de Servidor", "result":None}
                    return JsonResponse(datos)
                materiasPasadas.append({"año":año, "materias":materias["result"]})
            datos={"status": True, 'message': "Exito", "result":{"secciones":secciones["result"], "materiasInscribir":materiasInscribir["result"], "materiasAnteriores":materiasPasadas}}
        else:
            materiasInscribir=buscar_materias(id_añoEscolarizacion)
            if(not materiasInscribir["status"]):
                    datos={"status": False, 'message': "Error de Servidor", "result":None}
                    return JsonResponse(datos)
            datos={"status": True, 'message': "Exito", "result":{"secciones":secciones["result"], "materiasInscribir":materiasInscribir["result"], "materiasAnteriores":[]}}
        return JsonResponse(datos)

class AñosEscolarizacion_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        añosescolarizacion=años()
        if (añosescolarizacion["status"]):
            datos={"status": True, 'message': "Exito", "result": añosescolarizacion["result"]}
        else:
            datos={"status": False, 'message': "Error de Servidor", "result":None}
        return JsonResponse(datos)

class Login(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        data = json.loads(request.body)
        try:
            cursor=connection.cursor()
            query="""
                SELECT pel.id, pel.usuario, pel.contraseña, CONCAT(per.nombres, ' ', per.apellidos ) AS nombre, ca.nombre as cargo FROM personal pel
                LEFT JOIN personas per ON pel.persona_id = per.id
                LEFT JOIN cargos ca ON pel.cargo_id = ca.id
                WHERE pel.usuario=%s;
            """
            cursor.execute(query, [str(data['usuario'])])
            usuario=dictfetchall(cursor)
            print(usuario)
            if(len(usuario)>0):
                # se comprueba de que la contraseña este correcta
                contraseña = desencriptado_contraseña(usuario[0]["contraseña"], data['contraseña'])
                if(contraseña):
                    token=new_token(usuario[0])
                    response={'message': "Acceso permitido", 'status':True, 'token':token["token"], "result":{"nombre":usuario[0]["nombre"], "cargo":usuario[0]["cargo"], "usuario":usuario[0]["usuario"] }}
                    return JsonResponse(response)
                else:
                    response={'message': "Contraseña Incorrecta", 'status':False, 'result':None}
                    return JsonResponse(response)
            else:
                response={'message': "Usuario no Existe", 'status':False, 'result':None}
                return JsonResponse(response)
        except Exception as ex:
            print("Error", ex)
            datos = {'status':False,'message': 'Error en el sistema. Intente mas tarde'}
            return JsonResponse(datos)

class Usuario(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request):
        try:
            persona=Personas.objects.get(id=5)
            cargo = Cargos.objects.get(id=3)
            Personal.objects.create(persona=persona, usuario="ADMINISTRADOR", contraseña=encriptado_constraseña("123456789"), cargo=cargo )
            
            datos={"status": True, 'message': "Exito",}
            return JsonResponse(datos)
        except Exception as ex:
            print(ex)
            datos = {'message': "Error. Compruebe Datos"}
            return JsonResponse(datos)

class Cedulacion(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            datos = json.loads(request.body)
            
            cursor=connection.cursor()
            query="""
                SELECT pe.id, pe.nombres, pe.apellidos FROM personas pe WHERE pe.cedula=%s;
                """
            cursor.execute(query,[int(datos["cedula"])])
            persona = dictfetchall(cursor)
            if(len(persona)>0):
                datos={"status":True, "result":True}
            else:
                datos={"status":True, "result":False}
            return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            datos={"status":False, "result":None}
            return JsonResponse(datos)
        finally:
            cursor.close()
            connection.close()


class Estudiantes(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request, identificador=0):
        try:
            cursor=connection.cursor()
            if(identificador!=0):
                tipo=determinar_valor(identificador)
                if(tipo["type"]=="int"):
                    cedula_validate=str(tipo["valor"]) + "%"
                    query="""
                        SELECT re.id, pe.nombres, pe.apellidos, pe.cedula
                        FROM estudiantes es 
                        LEFT JOIN personas pe ON es.persona_id = pe.id
                        WHERE pe.cedula LIKE %s ;
                    """
                    cursor.execute(query, [cedula_validate])
                    resultado=dictfetchall(cursor)
                    datos={"status": True, 'message': "Exito", "result":resultado}
                else:
                    str_validate=edit_str(tipo["valor"])
                    print(str_validate)
                    query="""
                        SELECT re.id, pe.nombres, pe.apellidos, pe.cedula
                        FROM estudiantes es 
                        LEFT JOIN personas pe ON es.persona_id = pe.id
                        WHERE CONCAT(pe.nombres, ' ', pe.apellidos) LIKE %s ;
                    """
                    cursor.execute(query, [str_validate])
                    resultado=dictfetchall(cursor)
                    datos={"status": True, 'message': "Exito", "result":resultado}
            else:
                datos={"status": False, 'message': "Funcion no Creada", "result":None}
            return JsonResponse(datos)
        except Exception as ex:
            print(ex)
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