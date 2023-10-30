import { useEffect, useState, useContext } from 'react'
import Navbar from '../components/universal/Navbar'
import { calcular_edad, } from '../js/funciones.js'
import { año_escolarizacion, generos, registerRepresentantes } from '../js/servidor.js'
import { useForm } from "react-hook-form";
import { Modal } from "bootstrap"
import { useNavigate } from "react-router-dom";
import Toast from '../components/universal/Toast';
import { AuthContext } from '../context/AuthContext';

function Register_Representantes() {
    const navigate=useNavigate()
    const { user } = useContext(AuthContext)
    const [fecha, setFecha] = useState({ dia: null, mes: null, año: null, fecha_completa: null })
    const [data_campos, setData_campos] = useState({ generos: [] })
    const [stateDifunto, setDifunto] = useState(false)
    const [readOnly, setReadOnly] = useState(false)
    const [NotificacionError, setNotificacion] = useState([])

    useEffect(() => {

        const fecha_actual = new Date()
        setFecha({
            ...fecha,
            dia: Number(fecha_actual.getDate()),
            mes: Number(fecha_actual.getMonth() + 1),
            año: Number(fecha_actual.getFullYear()),
            fecha_completa: fecha_actual
        })
        consultar()
    }, [])

    // *funcion para buscar los campos del formulario de consulta de la BD
    const consultar = async () => {
        try {
            const dataGeneros = await generos()
            setData_campos({
                ...data_campos,
                generos: dataGeneros.data.result,
            })
        } catch (error) {
            console.log(error)
            addToads("Error de sistema", "error", "Llame al creador de este Sistema que esto no funciona")

        }
    }
    // *funcion para desabilitar los campos de contacto del padre o madre "Usada cuando una persona esta fallecida"
    const dissableDifunto = (e) => {
        if (e.target.checked) {
            const campos = [`fecha_nacimiento`, `correo`, `telefono`, `telefono`, `profesion`]
            campos.forEach(element => setValue(`${element}`, ""))
            setDifunto(true)
        } else {
            setDifunto(false)
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            id_persona: 0,
        }
    });

    const habilitarRepresentante = () => {
        const campos = [`nombres`, `apellidos`, `nacionalidad`, `cedula`, `genero`, `fecha_nacimiento`, `correo`, `telefono`, `telefono`, `profesion`, `id`, `fallecido`]
        campos.forEach(element => setValue(`${element}`, ""))
        document.getElementById(`input_externo`).classList.add("d-none")
        document.getElementById(`input_externo`).classList.remove("d-flex")

        setDifunto(false)
    }
    const onSubmit = handleSubmit(
        async (data) => {
            try {
                document.getElementById("button-submit").disabled=true
                const representante = {
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    cedula: Number(data.cedula),
                    nacionalidad: data.nacionalidad === "v" ? true : false,
                    genero: Number(data.genero),
                    fallecido: data.fallecido,
                    fecha_nacimiento: data.fecha_nacimiento !== "" ? data.fecha_nacimiento : null,
                    telefono: data.telefono !== "" ? data.telefono : "",
                    telefono_alterno: data.telefono_alterno !== "" ? data.telefono_alterno : "",
                    profesion: data.profesion !== "" ? data.profesion : null,
                    correo: data.correo !== "" ? data.correo : null
                }
                const register = await registerRepresentantes(representante)
                if (register.data.status) {
                    const modal = new Modal("#staticBackdrop")
                    modal.show()
                } else {
                    document.getElementById("button-submit").disabled=false
                    window.scrollTo(0, 0)
                    addToads("Error de Registro", "error", register.data.message)
                    // addToads("Error de sistema", "error", "Llame al creador de este Sistema que esto no funciona")

                }

            } catch (error) {
                document.getElementById("button-submit").disabled=false
                console.log(error)
                addToads("Error de sistema", "error", "Llame al creador de este Sistema que esto no funciona =(")
            }
        });

    const addToads = (titulo, tipo, description) => {
        const numeroAlAzar = Math.floor(Math.random() * 100);
        const fecha = Date.now();
        const toastId = `notificacion_${fecha + numeroAlAzar}`;
        const array = NotificacionError.concat({ id: toastId, titulo: titulo, description: description, tipo: tipo })
        setNotificacion(array)
    }

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='w-100 bg-light d-flex flex-column align-items-center justify-content-center px-2 px-md-5 pb-5 '>
                <span className='ms-auto mt-3 mb-4 fw-bold'>{`Bienvenido, ${user.nombre}`}</span>
                <form className='form-nuevo-ingreso d-flex flex-column border border-2 border-secundary w-100 py-2 px-3' onSubmit={onSubmit} >
                    <button type='submit' className='d-none' disabled aria-hidden="true"></button>
                    <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between'>
                        <h1 className='m-0 h3 fw-bold'>Registro de Representante</h1>
                        <p className='m-0 mt-2 mt-md-0 fw-semibold'>Fecha: {fecha.año ? `${fecha.dia}/${fecha.mes}/${fecha.año}` : "-"}</p>
                    </div>
                    <hr />

                    <div className='d-flex flex-column align-items-center justify-content-around position-relative' style={{ "zIndex": "1" }}>
                        <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center me-auto mb-2'>
                            <h4 className='m-0 h4 fw-bold me-5 ' >Registro de Representante</h4>

                            <div className='d-flex mt-2 mt-md-0'>

                                <div className='d-none align-items-center' id={`input_externo`}>
                                    <label htmlFor={`externo`} className='h6 m-0 fw-bold cursor-pointer'>Cambiar</label>
                                    <input
                                        type="checkbox" className='form-check-input ms-1' id={`externo`} name={`externo`}
                                        {
                                        ...register(`externo`, {
                                            onChange: () => { habilitarRepresentante() }
                                        })
                                        }
                                    />
                                </div>

                                <div className='d-flex align-items-center ms-2'>
                                    <label htmlFor={`fallecido`} className='h6 m-0 fw-bold cursor-pointer'>Difunto</label>
                                    <input type="checkbox" className='form-check-input ms-1' id={`fallecido`} name={`fallecido`} disabled={(readOnly)}
                                        {
                                        ...register(`fallecido`, {
                                            onChange: (e) => { dissableDifunto(e) }
                                        })
                                        }
                                    />
                                </div>

                                <input type="number" className='d-none'
                                    {
                                    ...register(`id_persona`)
                                    }
                                />
                            </div>
                        </div>



                        <div className="w-100">
                            <div className='w-100 flex-column flex-md-row d-flex align-items-center justify-content-between my-4'>
                                {/* input nombre */}
                                <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${((errors[`nombres`]) && !readOnly) ? "error" : "bien"}`} >
                                    <label className='h6 fw-bold cursor-pointer' htmlFor={`nombres`}>{`Nombres`}</label>
                                    <input className='input-text bg-secundary' type="text" name={`nombres`} id={`nombres`} readOnly={readOnly}
                                        {...register(`nombres`, {
                                            required: {
                                                value: true,
                                                message: "Nombres requerido",
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "Máximo 100 caracteres",
                                            },
                                            minLength: {
                                                value: 5,
                                                message: "Minimo 5 caracteres",
                                            },
                                            pattern: {
                                                value: /^[a-zA-ZÁ-ÿ\s]+$/,
                                                message: "Nombres no válido",
                                            },
                                        })}
                                    />
                                    {(errors[`nombres`]) ? <span className='menssage'>{errors[`nombres`].message}</span> : <span className='menssage'>Ingrese sus dos nombres</span>}
                                </div>
                                <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${((errors[`apellidos`]) && !readOnly) ? "error" : "bien"}`} >
                                    <label className='h6 fw-bold cursor-pointer' htmlFor={`apellidos`}>{`Apellidos`}</label>
                                    <input className='input-text bg-secundary' type="text" name={`apellidos`} id={`apellidos`} readOnly={readOnly}
                                        {...register(`apellidos`, {
                                            required: {
                                                value: true,
                                                message: "Apellidos requerido",
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "Máximo 100 caracteres",
                                            },
                                            minLength: {
                                                value: 5,
                                                message: "Minimo 5 caracteres",
                                            },
                                            pattern: {
                                                value: /^[a-zA-ZÁ-ÿ\s]+$/,
                                                message: "Apellidos no válido",
                                            },
                                        })}
                                    />
                                    {(errors[`apellidos`]) ? <span className='menssage'>{errors[`apellidos`].message}</span> : <span className='menssage'>Ingrese sus dos nombres</span>}
                                </div>
                            </div>

                            <div className='w-100 flex-column flex-md-row d-flex align-items-center justify-content-between my-2'>

                                {/* input cedula */}
                                <div className={`w-55 w-md-100 d-flex flex-column ${((errors[`cedula`] || errors[`nacionalidad`]) && !readOnly) ? "error" : "bien"}`}>
                                    <div className='w-100 d-flex mx-1 align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center mt-3'>
                                            <div className='form-check '>
                                                <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor={`V`}>V</label>
                                                <input className='form-check-input' type="radio" name={`nacionalidad`} id={`V`} defaultValue={"v"} disabled={readOnly} defaultChecked
                                                    {
                                                    ...register(`nacionalidad`, {
                                                        validate: (e) => {
                                                            if (e === "v" || e === "e") {
                                                                return true
                                                            } else { return "se requiere la nacionalidad" }
                                                        }
                                                    })
                                                    }
                                                />
                                            </div>
                                            <div className='form-check ms-2 '>
                                                <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor={`E`}>E</label>
                                                <input className='form-check-input' type="radio" name={`nacionalidad`} id={`E`} defaultValue={"e"} disabled={readOnly}
                                                    {
                                                    ...register(`nacionalidad`, {
                                                        validate: (e) => {
                                                            if (e === "v" || e === "e") {
                                                                return true
                                                            } else { return "se requiere la nacionalidad" }
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column ms-1 input-cedula'>
                                            <label className='h6 fw-bold cursor-pointer' htmlFor={`cedula`}>Cedula</label>
                                            <input className='input-text bg-secundary' type="number" name={`cedula`} id={`cedula`} readOnly={readOnly}
                                                {
                                                ...register(`cedula`, {
                                                    maxLength: {
                                                        value: 8,
                                                        message: "Máximo 8 caracteres",
                                                    },
                                                    minLength: {
                                                        value: 7,
                                                        message: "Minimo 7 caracteres",
                                                    },
                                                    validate: (e) => {
                                                        if (e === "") {
                                                            return "Se requiere la cedula"
                                                        } else { return true }
                                                    }

                                                })} />
                                        </div>
                                    </div>
                                    {errors[`cedula`] ? <span className='menssage'>{errors[`cedula`].message}</span> : <span className='menssage'>Ingrese la cedula</span>}
                                    {errors[`nacionalidad`] ? <span className='menssage'>{errors[`nacionalidad`].message}</span> : <></>}

                                </div>

                                {/* en esta sección si se pide parentesco genera una modificacion agregandolo  de lo contrario solo reguresa el genero */}
                                <div className={`w-40 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-1 ${(errors[`genero`] && !readOnly) ? "error" : "bien"}`}>
                                    <label className='h6 fw-bold cursor-pointer' htmlFor={`genero`}>Genero</label>
                                    <select className="form-select input-select " aria-label="Large select example" name={`genero`} id={`genero`} defaultValue={null} readOnly={readOnly}
                                        {
                                        ...register(`genero`, {
                                            requerid: {
                                                value: true,
                                                message: "Genero Requerido"
                                            },
                                            validate: (value) => {
                                                if ((value === "Genero" || value === "")) {
                                                    return "Seleccione el Genero"
                                                } else {
                                                    return true
                                                }
                                            }
                                        })}>
                                        <option value={null}>Genero</option>
                                        {
                                            data_campos.generos.length !== 0 ?
                                                data_campos.generos.map(element => (
                                                    <option key={`genero_${element.id}`} value={element.id} >{element.genero}</option>
                                                )) :
                                                <></>
                                        }
                                    </select>
                                    {errors[`genero`] ? <span className='menssage'>{errors[`genero`].message}</span> : <span className='menssage'>Genero</span>}
                                </div>
                            </div>

                            <div className='w-100 flex-column flex-md-row d-flex align-items-center justify-content-between my-2'>
                                {/* fecha de nacimiento */}
                                <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${(errors[`fecha_nacimiento`] && !stateDifunto && !readOnly) ? "error" : "bien"}`}>
                                    <label className='h6 fw-bold cursor-pointer' htmlFor={`fecha_nacimiento`}>Fecha de Nacimiento</label>
                                    <input className='input-text bg-secundary' type="date" name={`fecha_nacimiento`} id={`fecha_nacimiento`} max={`${fecha.año}-${fecha.mes}-${fecha.dia}`} readOnly={readOnly} disabled={stateDifunto}
                                        {...register(`fecha_nacimiento`, {
                                            required: {
                                                value: (!stateDifunto && !readOnly),
                                                message: "Se requiere la fecha de nacimiento",
                                            },
                                            validate: (value) => {
                                                const edad = calcular_edad(value, fecha.fecha_completa)
                                                if (edad < 18 || edad > 100) {
                                                    return `${edad} Edad no validad`
                                                }
                                            }
                                        })} />
                                    {errors[`fecha_nacimiento`] ? <span className='menssage'>{errors[`fecha_nacimiento`].message}</span> : <span className='menssage'>Fecha de nacimiento</span>}
                                </div>
                                {/* Correo */}
                                <div className={`w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-0 mx-md-1 ${(errors[`correo`] && !readOnly) ? "error" : "bien"}`}>
                                    <label className='h6 fw-bold cursor-pointer' htmlFor={`correo`}>Correo Electronico</label>
                                    <input className='input-text bg-secundary' type="text" name={`correo`} id={`correo`} readOnly={readOnly} disabled={stateDifunto}
                                        {...register(`correo`, {
                                            maxLength: {
                                                value: 100,
                                                message: "Máximo 100 caracteres",
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Correo no válido",
                                            },
                                        })}
                                    />
                                    {errors[`correo`] ? <span className='menssage'>{errors[`correo`].message}</span> : <span className='menssage'>Correo</span>}
                                </div>
                            </div>

                            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
                                <div className={`w-50 w-md-100 d-flex flex-column  mx-1 ${(errors[`telefono`] && !stateDifunto && !readOnly) ? "error" : "bien"}`}>
                                    <label className='h6 fw-bold cursor-pointer' htmlFor={`telefono`}>Telefono</label>
                                    <input className='input-text bg-secundary' type="number" name={`telefono`} id={`telefono`} readOnly={readOnly} disabled={stateDifunto}
                                        {...register(`telefono`, {
                                            maxLength: {
                                                value: 11,
                                                message: "Solo se admiten 11 caracteres",
                                            },
                                            minLength: {
                                                value: 11,
                                                message: "Solo se admiten 11 caracteres",
                                            },
                                            required: {
                                                value: (!stateDifunto),
                                                message: "Telefono requerido"
                                            }
                                        })}
                                    />
                                    {errors[`telefono`] ? <span className='menssage'>{errors[`telefono`].message}</span> : <span className='menssage'>telefono</span>}
                                </div>
                                <div className={`w-50 w-md-100 d-flex flex-column mt-md-0  mx-1 ${(errors[`telefono_alterno`] && !readOnly) ? "error" : "bien"}`}>
                                    <label className='h6 fw-bold cursor-pointer' htmlFor={`telefono_alterno`}>Telefono Alterno</label>
                                    <input className='input-text bg-secundary' type="number" name={`telefono_alterno`} id={`telefono_alterno`} readOnly={readOnly} disabled={stateDifunto}
                                        {...register(`telefono_alterno`, {
                                            maxLength: {
                                                value: 11,
                                                message: "Solo se admiten 11 caracteres",
                                            },
                                            minLength: {
                                                value: 11,
                                                message: "Solo se admiten 11 caracteres",
                                            }
                                        })}
                                    />
                                    {errors[`telefono_alterno`] ? <span className='menssage'>{errors[`telefono_alterno`].message}</span> : <span className='menssage'>telefono</span>}
                                </div>
                            </div>

                            <div className='d-flex flex-column flex-sm-row align-items-center justify-content-between w-100 px-1'>
                                <div className={`w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column ${(errors[`profesion`] && !stateDifunto && !readOnly) ? "error" : "bien"}`}>
                                    <label className='h6 fw-bold cursor-pointer' htmlFor={`profesion`}>Profesión</label>
                                    <input className='input-text bg-secundary' type="text" id={`profesion`} name={`profesion`} readOnly={readOnly} disabled={stateDifunto}
                                        {
                                        ...register(`profesion`, {
                                            required: {
                                                value: (!stateDifunto),
                                                message: "Profesión requerida",
                                            },
                                            maxLength: {
                                                value: 200,
                                                message: "Máximo 100 caracteres",
                                            },
                                            minLength: {
                                                value: 5,
                                                message: "Minimo 5 caracteres",
                                            },
                                            pattern: {
                                                value: /^[a-zA-ZÁ-ÿ\s]+$/,
                                                message: "Profesión no válida",
                                            },
                                        })
                                        } />
                                    {errors[`profesion`] ? <span className='menssage'>{errors[`profesion`].message}</span> : <span className='menssage'>profesión</span>}

                                </div>
                            </div>

                        </div>
                        <button type='submit' onClick={() => { console.log(errors) }} className='btn btn-success btn-lg  px-3 py-2 mt-5 mb-3 mx-auto ' id="button-submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"></path><path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"></path></svg>
                            Registrar
                        </button>
                    </div>
                </form>
            </main>
            <div className="contenedor-notificacion" id="contenedor-notificacion">
                {
                    NotificacionError.length !== 0 ?
                        NotificacionError.map((Element) => (
                            <Toast key={Element.id} id={Element.id} titulo={Element.titulo} description={Element.description} icono={Element.tipo} array={NotificacionError} funtionArray={setNotificacion} />
                        )) : <></>
                }
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3">
                        
                        <div className="modal-body">
                            <h1 className='fw-bold h4 text-center'>Registro Completado</h1>
                        </div>
                        <div className="modal-footer">
                            <button type='button' onClick={()=>{navigate("/inicio")}} className="btn btn-success mx-auto" data-bs-dismiss="modal">Ir al Inicio</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register_Representantes