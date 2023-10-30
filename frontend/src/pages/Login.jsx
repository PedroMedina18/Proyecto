import { useState, useContext, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { login } from "../js/servidor.js"
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

function Login() {
    const { setLoginUser, user } = useContext(AuthContext)
    const [error, setError]= useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        if( document.getElementById("usuario").value !== ""){
            document.getElementById("usuario").add("show")
        } 
        if( document.getElementById("password").value !== ""){
            document.getElementById("password").add("show")
        } 
    },[])

    // **Funcion encargada de verificar si hay algun valor en el input
    const show = (e) => {
        if (e.target.value !== "") {
            e.target.nextSibling.classList.add("show")
        } else {
            e.target.nextSibling.classList.remove("show")
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = handleSubmit(
        async (data) => {
            try {
                document.getElementById("button-login").disabled=true
                const res = await login(data)
                if(res.data.status){
                    setLoginUser({
                        ...user,
                        state:true,
                        token:res.data.token,
                        nombre:res.data.result.nombre,
                        usuario:res.data.result.usuario,
                        cargo:res.data.result.cargo,
                    })
                    navigate("/inicio")
                }else{
                    setError(res.data.message)
                    document.getElementById("button-login").disabled=false
                }
            } catch (error) {
                console.log(error)
                setError("Error de sistema")
                document.getElementById("button-login").disabled=false
            }
        });
    return (
        <main className='w-100 vh-100 d-flex flex-column align-items-center justify-content-center bg-light '>

            <form className='login bg-secondary d-flex flex-column align-items-center justify-content-around '
                onSubmit={onSubmit}>
                <div className='icono text-primary'>
                    <svg className='img-usuario '
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
                    </svg>
                </div>

                <h1 className="h3 fw-bold text-primary my-2">Inicio de Sesión</h1>
                <div className=' bg-dark mt-1 w-100 d-flex py-1 align-items-center pe-2'>
                    <label className={`label-icono ${errors.usuario ? "colorError" : "text-primary"}`} htmlFor="usuario">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
                    </label>
                    <div className='d-flex ms-1 flex-column input-disable'>
                        <input className={`${errors.usuario ? "error" : ""}`} id='usuario' name="usuario" type="text" autoComplete="off"
                            {
                            ...register("usuario", {
                                required: {
                                    value: true,
                                    message: "Se requiere el usuario",
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Máximo 100 caracteres",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9+-@_.%&$#/]+$/,
                                    message: "Usuario invalido",
                                },
                                onBlur: (e) => { show(e) }
                            })
                            } />
                        <label className={`${errors.usuario ? "colorError" : "text-primary"} border-primary`} htmlFor="usuario">Usuario</label>
                    </div>
                </div>
                {errors.usuario ? <span className='errorLogin'>{errors.usuario.message}</span> : <span className='errorLogin'></span>}
                <div className='bg-dark  w-100 d-flex py-1 align-items-center pe-2'>
                    <label className={`label-icono ${errors.contraseña ? "colorError" : "text-primary"}`} htmlFor="password">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path></svg>
                    </label>
                    <div className='d-flex ms-1 flex-column input-disable'>
                        <input className={`${errors.contraseña ? "error" : ""}`} id="password" name="password" type="password"
                            {
                            ...register("contraseña", {
                                required: {
                                    value: true,
                                    message: "Contraseña requerido",
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Máximo 16 caracteres",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9+-@_.%&$#/]+$/,
                                    message: "Contraseña no válido solo números, letras minusculas o mayusculas y los caracteres +, -, @, _, ., %, &, $, # y /",
                                },
                                onBlur: (e) => { show(e) }
                            })
                            } />
                        <label className={`${errors.contraseña ? "colorError" : "text-primary"} border-primary`} htmlFor="password">Contraseña</label>
                    </div>
                </div>
                {errors.contraseña ? <span className='errorLogin'>{errors.contraseña.message}</span> : <span className='errorLogin'></span>}
                {
                    error?
                    (<span className='errorLogin text-center'>{error}</span>)
                    :
                    <></>
                }
                <button type="submit" id="button-login" className=' btn btn-primary btn-lg w-100 mt-3'>Ingresar</button>
            </form>
        </main>
    )
}

export default Login