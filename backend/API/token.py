from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from jwt import encode, decode, ExpiredSignatureError, InvalidSignatureError, DecodeError
from decouple import config
import pytz

def encriptado_constraseña(text):
    texto_encriptado=generate_password_hash(text, 'pbkdf2:sha256', 30)
    return texto_encriptado

def desencriptado_contraseña(texto_encriptado, contraseña):
    respuesta=check_password_hash(texto_encriptado, contraseña)
    return(respuesta)




def new_token(user):
    fecha=datetime.now()
    fechaNew=datetime.now() + timedelta(hours=10)
    payload = {
            'iat': fecha,
            'exp': fechaNew,
            "id":user["id"],
        }
    return {"token":encode(payload, config('TOKEN'), algorithm="HS256"), "fecha":fechaNew}

def verify_token(headers):
    if 'Authorization' in headers.keys():
        authorization = headers['Authorization']
        encoded_token = authorization.split(" ")[1]
        if (len(encoded_token) > 0):
            try:
                payload = decode(encoded_token, config('TOKEN'), algorithms=["HS256"])
                if(payload):
                    return {'status':True,'message': 'Token valido', "info":payload}
            except DecodeError:
                datos = {'status':False,'message': 'Token Invalido'}
                return datos
            except ExpiredSignatureError:
                datos = {'status':False,'message': 'Token Expirado'}
                return datos
            except InvalidSignatureError:
                datos = {'status':False,'message': 'Token Invalido 2'}
                return datos
    datos = {'status':False,'message': 'Sin Autorizacion'}
    return datos
