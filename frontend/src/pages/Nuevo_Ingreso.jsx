import { useEffect, useState, useContext } from 'react'
import Navbar from '../components/universal/Navbar'
import Form_representante from '../components/nuevo_ingreso/Form_representante.jsx'
import FormRepresentanteLegal from '../components/nuevo_ingreso/FormRepresentanteLegal'
import Materias from '../components/nuevo_ingreso/Materias.jsx'
import { calcular_edad, } from '../js/funciones.js'
import { año_escolarizacion, añoInscripcion, generos, parentescos, inscripciones } from '../js/servidor.js'
import { useForm } from "react-hook-form";
import { Collapse } from "bootstrap"
import { AuthContext } from '../context/AuthContext';
import Toast from '../components/universal/Toast'
import { Modal } from "bootstrap"
import { useNavigate } from "react-router-dom";
function Nuevo_Ingreso() {
    const navigate=useNavigate()
    const { user } = useContext(AuthContext)
    const [fecha, setFecha] = useState({ dia: null, mes: null, año: null, fecha_completa: null })
    const [data_campos, setData_campos] = useState({ generos: [], parentescos: [], años: [] })
    const [representanteAlterno, setRepresentante] = useState(false)
    const [secciones, SetSecciones] = useState([])
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
            const dataParentescos = await parentescos()
            const años = await año_escolarizacion()
            setData_campos({
                ...data_campos,
                generos: dataGeneros.data.result,
                parentescos: dataParentescos.data.result,
                años: años.data.result
            })
        } catch (error) {
            console.log(error)
        }
    }

    // *funcion para desabilitar el campo de cedula del estudiante cuante este no tenga cedula
    const dissableCedula = (e) => {
        const inputCedula = document.getElementById("cedula_estudiante")
        const inputV = document.getElementById("V_estudiante")
        const inputE = document.getElementById("E_estudiante")
        if (e.target.checked) {
            inputCedula.disabled = true
            inputV.disabled = true
            inputE.disabled = true
            setValue("cedula_estudiante", "")
            setValue("nacionalidad_estudiante", "")
        } else {
            inputCedula.disabled = false
            inputV.disabled = false
            inputE.disabled = false
        }
    }

    // *funcion para controlar si se activo o no la opcion de contacto alternativo
    const contactoAlternativo = (e) => {
        e.target.querySelector("svg").classList.toggle("rotate-180")
        const collapse = new Collapse("#collapseExample", {
            toggle: true
        })
        if (!representanteAlterno) {
            setRepresentante(!representanteAlterno)
            setValue(`disable_alterno`, true)
        } else {
            setTimeout(() => { setRepresentante(!representanteAlterno) }, 500)
            const campos = ["nombres_alterno", "apellidos_alterno", "nacionalidad_alterno", "cedula_alterno", "genero_alterno", "fecha_nacimiento_alterno", "correo_alterno", "telefono_alterno", "telefono_alterno_alterno", "profesion_alterno", "id_alterno"]
            setValue(`disable_alterno`, false)
            campos.forEach(element => setValue(`${element}`, ""))
        }

    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
            tipo_representante: "externo",
            disable_alterno: false
        }
    });

    // *Funcion para buscar la secciones y las notas de las materias
    const buscarseccion = async (e) => {
        if (e.target.value !== "Año") {
            try {
                const res = await añoInscripcion(Number(e.target.value))
                if (res.data.status) {
                    SetSecciones(res.data.result)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            SetSecciones([])
        }
    }
    const onSubmit = handleSubmit(
        async (data) => {
            try {
                document.getElementById("button-submit").disabled = true
                //! verificacion de datos
                const estudiante = {
                    nombres: data.nombres_estudiante,
                    apellidos: data.apellidos_estudiante,
                    genero:Number(data.genero_estudiante),
                    cedula: data.cedula_estudiante !== "" ? Number(data.cedula_estudiante) : null,
                    nacionalidad: data.nacionalidad_estudiante === "" ? null : data.nacionalidad_estudiante === "v" ? true : false,
                    propia: data.propia == false ? true : false,
                    fecha_nacimiento: data.fecha_nacimiento_estudiante,
                    lugar_nacimiento: data.lugar_nacimiento,
                    direccion_habitacional: data.direccion_estudiante,
                    telefono: data.telefono_estudiante === "" ? String(data.telefono_estudiante) : "",
                    correo: data.correo_estudiante === "" ? data.correo_estudiante : null,
                    observaciones: data.observaciones_estudiante === "" ? data.observaciones_estudiante : null,
                    año_ingreso: Number(data.año_esolarizacion),
                    año_seccion: Number(data.seccionInscripcion),
                }
                const representante = []
                if (!isNaN(data.id_madre)) {
                    representante.push({ id: data.id_madre, parentesco: data_campos.parentescos.filter(e => e.parentesco == "Madre")[0].id })
                }
                if (!isNaN(data.id_padre)) {
                    representante.push({ id: data.id_padre, parentesco: data_campos.parentescos.filter(e => e.parentesco == "Padre")[0].id })
                }
                if (data.id_alterno ? !isNaN(data.id_alterno) : false) {
                    representante.push({ id: data.id_alterno, parentesco: data.parentesco_alterno })
                }
                const representante_legal = {}
                if (data.tipo_representante === "padre") {
                    representante_legal.id = Number(data.id_padre)
                    representante_legal.parentesco = data_campos.parentescos.filter(e => e.parentesco == "Padre")[0].id
                }
                if (data.tipo_representante === "madre") {
                    representante_legal.id = Number(data.id_madre)
                    representante_legal.parentesco = data_campos.parentescos.filter(e => e.parentesco == "Madre")[0].id
                }
                if (data.tipo_representante === "externo") {
                    representante_legal.id = Number(data.id_RepresentanteLegal)
                    representante_legal.parentesco = Number(data.parentesco_RepresentanteLegal)
                }
                const requisitos = {
                    certificado_notas: data.certificado_notas,
                    boleta_promocion: data.boleta_promocion,
                    carta_buena_conducta: data.carta_buena_conducta,
                    fotos_estudiante: data.fotos_estudiante,
                    fotos_representante: data.fotos_representante,
                    fotocopia_cedula_estudiante: data.fotocopia_ci_estudiante,
                    fotocopia_cedula_representante: data.fotocopia_ci_representante,
                    partida_nacimiento: data.partida_nacimiento,
                }
                const materias = document.querySelectorAll(".materia")
                const notas = []
                if (materias.length !== 0) {
                    materias.forEach(element => {
                        notas.push({ id: element.dataset.materia, nota: Number(element.value) })
                    })
                }
                const register = await inscripciones({
                    estudiante: estudiante,
                    requisitos: requisitos,
                    notas: notas,
                    representantes: representante,
                    representante_legal: representante_legal,
                    materias_inscribir: secciones.materiasInscribir
                })
                if (register.data.status) {
                    const modal = new Modal("#staticBackdrop")
                    modal.show()
                } else {
                    document.getElementById("button-submit").disabled = false
                    window.scrollTo(0, 0)
                    addToads("Error de Registro", "error", register.data.message)
                    // addToads("Error de sistema", "error", "Llame al creador de este Sistema que esto no funciona")

                }

            } catch (error) {
                document.getElementById("button-submit").disabled = false
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
                <form className='form-nuevo-ingreso d-flex flex-column border border-2 border-secundary w-100 py-2 px-3'
                    onSubmit={onSubmit} >
                    {/* Boton para evitar el submit con enter */}
                    <button type='submit' className='d-none' disabled aria-hidden="true"></button>
                    <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between'>
                        <h1 className='m-0 h3 fw-bold'>Nuevo Ingreso</h1>
                        <p className='m-0 mt-2 mt-md-0 fw-semibold'>Fecha: {fecha.año ? `${fecha.dia}/${fecha.mes}/${fecha.año}` : "-"}</p>
                        <p className='m-0 mt-2 mt-md-0 fw-semibold'>Periodo:Inscripciones</p>
                    </div>
                    <hr />

                    {/* ----------------------Datos del Estudiante---------------------- */}
                    <div className='d-flex flex-column align-items-center justify-content-around'>
                        <h2 className='m-0 h4 fw-bold me-auto mb-2'>Estudiante</h2>

                        <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
                            <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${errors.nombres_estudiante ? "error" : "bien"}`} >
                                <label className='h6 fw-bold cursor-pointer' htmlFor="nombres_estudiante">Nombres del Estudiante</label>
                                <input className='input-text bg-secundary' type="text" name="nombres_estudiante" id="nombres_estudiante"
                                    {...register("nombres_estudiante", {
                                        required: {
                                            value: true,
                                            message: "Se requiere los nombres",
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
                                {errors.nombres_estudiante ? <span className='menssage'>{errors.nombres_estudiante.message}</span> : <span className='menssage'>Ingrese sus dos nombres</span>}
                            </div>
                            <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${errors.apellidos_estudiante ? "error" : "bien"}`} >
                                <label className='h6 fw-bold cursor-pointer' htmlFor="apellidos_estudiante">Apellidos del Estudiante</label>
                                <input className='input-text bg-secundary' type="text" name="apellidos_estudiante" id="apellidos_estudiante"
                                    {...register("apellidos_estudiante", {
                                        required: {
                                            value: true,
                                            message: "Se requiere los nombres",
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
                                {errors.apellidos_estudiante ? <span className='menssage'>{errors.apellidos_estudiante.message}</span> : <span className='menssage'>Ingrese sus dos apellidos</span>}
                            </div>
                        </div>

                        <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
                            <div className={`w-55 w-md-100 d-flex flex-column align-items-start ${(errors.cedula_estudiante && !watch("propia")) ? "error" : "bien"}`}>
                                <div className='w-100 d-flex mx-1 align-items-center justify-content-between'>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div className='form-check '>
                                            <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="V_estudiante">V</label>
                                            <input className='form-check-input' type="radio" name="nacionalidad_estudiante" id='V_estudiante' defaultValue={"v"} defaultChecked
                                                {
                                                ...register("nacionalidad_estudiante", {
                                                    validate: (e) => {
                                                        if (e === "" && !watch("propia")) {
                                                            return "Nacionalidad requeridad"
                                                        } else {
                                                            return true
                                                        }
                                                    }
                                                })
                                                } />
                                        </div>
                                        <div className='form-check ms-2 '>
                                            <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="E_estudiante">E</label>
                                            <input className='form-check-input' type="radio" name="nacionalidad_estudiante" id='E_estudiante' defaultValue={"e"}
                                                {
                                                ...register("nacionalidad_estudiante", {
                                                    validate: (e) => {
                                                        if (e === "" && !watch("propia")) {
                                                            return "Nacionalidad requeridad"
                                                        } else {
                                                            return true
                                                        }
                                                    }
                                                })
                                                } />
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column mx-1 input-cedula'>
                                        <label className='h6 fw-bold cursor-pointer' htmlFor="cedula_estudiante">Cedula</label>
                                        <input className='input-text bg-secundary' type="number" name="cedula_estudiante" id="cedula_estudiante"
                                            {
                                            ...register("cedula_estudiante", {

                                                maxLength: {
                                                    value: 8,
                                                    message: "Máximo 8 caracteres",
                                                },
                                                minLength: {
                                                    value: 7,
                                                    message: "Minimo 7 caracteres",
                                                },
                                                validate: (value) => {
                                                    if (watch("propia") || value !== "") {
                                                        return true
                                                    } else {
                                                        return "Cedula Requerida"
                                                    }
                                                }

                                            })} />
                                    </div>
                                    <div className='tooltip-new '>
                                        <input onClick={(e) => { dissableCedula(e) }} className='form-check-input ms-2 mt-3' type="checkbox" id='Propia'
                                            {
                                            ...register("propia",)
                                            }
                                        />
                                        <span className='tooltip-new-box'>Seleccionar si el Estudiante no posee cedula propia</span>
                                    </div>

                                </div>
                                {errors.cedula_estudiante ? <span className='menssage'>{errors.cedula_estudiante.message}</span> : <span className='menssage'>Ingrese la cedula</span>}
                                {errors.nacionalidad_estudiante ? <span className='menssage'>{errors.nacionalidad_estudiante.message}</span> : <></>}
                            </div>

                            <div className={`w-40 w-md-100 d-flex flex-column mx-1 ${errors.genero_estudiante ? "error" : "bien"}`}>
                                <label className='h6 fw-bold cursor-pointer' htmlFor="genero_estudiante">Genero</label>
                                <select className="form-select input-select" id="genero_estudiante" aria-label="Large select example" name="genero_estudiante" defaultValue={null}
                                    {
                                    ...register("genero_estudiante", {
                                        validate: (value) => {
                                            if (value === "Genero") {
                                                return "Seleccione el Genero"
                                            }
                                        }
                                    })}>
                                    <option value={null} >Genero</option>
                                    {
                                        data_campos.generos.length !== 0 ?
                                            data_campos.generos.map(element => (
                                                <option key={`${element.id}_estudiante`} value={element.id} >{element.genero}</option>
                                            )) :
                                            <></>
                                    }
                                </select>
                                {errors.genero_estudiante ? <span className='menssage'>{errors.genero_estudiante.message}</span> : <span className='menssage'>Genero</span>}
                            </div>
                        </div>

                        <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
                            <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${errors.fecha_nacimiento_estudiante ? "error" : "bien"}`}>
                                <label className='h6 fw-bold cursor-pointer' htmlFor="fecha_nacimiento_estudiante">Fecha de Nacimiento</label>
                                <input className='input-text bg-secundary' type="date" name="fecha_nacimiento_estudiante" id="fecha_nacimiento_estudiante" max={`${fecha.año}-${fecha.mes}-${fecha.dia}`}
                                    {...register("fecha_nacimiento_estudiante", {
                                        required: {
                                            value: true,
                                            message: "Se requiere la fecha de nacimiento",
                                        },
                                        validate: (value) => {
                                            const edad = calcular_edad(value, fecha.fecha_completa)
                                            if (edad < 11 || edad > 19) {
                                                return "Edad no permitidad para inscripción"
                                            }
                                        }
                                    })} />
                                {errors.fecha_nacimiento_estudiante ? <span className='menssage'>{errors.fecha_nacimiento_estudiante.message}</span> : <span className='menssage'>Fecha de nacimiento</span>}
                            </div>
                            <div className={`w-50 mt-2 mt-md-0 w-md-100 d-flex flex-column mx-1 ${errors.lugar_nacimiento ? "error" : "bien"}`}>
                                <label className='h6 fw-bold cursor-pointer' htmlFor="lugar_nacimiento">Lugar de Nacimiento</label>
                                <input className='input-text bg-secundary' type="text" name="lugar_nacimiento" id="lugar_nacimiento"
                                    {
                                    ...register("lugar_nacimiento", {
                                        required: {
                                            value: true,
                                            message: "Se requiere Lugar de Nacimiento",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Máximo 100 caracteres",
                                        },
                                        minLength: {
                                            value: 7,
                                            message: "Minimo 7 caracteres",
                                        }
                                    })}
                                />
                                {errors.lugar_nacimiento ? <span className='menssage'>{errors.lugar_nacimiento.message}</span> : <span className='menssage'>Lugar de Nacimiento</span>}
                            </div>
                        </div>

                        <div className={`w-100 d-flex flex-column mx-1 my-2 ${errors.direccion_estudiante ? "error" : "bien"}`}>
                            <label className='h6 fw-bold cursor-pointer' htmlFor="direccion_estudiante">Dirección Habitacional</label>
                            <input className='input-text bg-secundary' type="text" name="direccion_estudiante" id="direccion_estudiante"
                                {
                                ...register("direccion_estudiante", {
                                    required: {
                                        value: true,
                                        message: "Se requiere Direccion Habitacional",
                                    },
                                    maxLength: {
                                        value: 250,
                                        message: "Máximo 250 caracteres",
                                    },
                                    minLength: {
                                        value: 7,
                                        message: "Minimo 7 caracteres",
                                    }
                                })}
                            />
                            {errors.direccion_estudiante ? <span className='menssage'>{errors.direccion_estudiante.message}</span> : <span className='menssage'>Dirección Habitacional</span>}
                        </div>

                        <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
                            <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${errors.telefono_estudiante ? "error" : "bien"}`}>
                                <label className='h6 fw-bold cursor-pointer' htmlFor="telefono_estudiante">Telefono</label>
                                <input className='input-text bg-secundary' type="number" name="telefono_estudiante" id="telefono_estudiante"
                                    {...register("telefono_estudiante", {
                                        required: {
                                            value: true,
                                            message: "Se requiere numero de Telefono"
                                        },
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
                                {errors.telefono_estudiante ? <span className='menssage'>{errors.telefono_estudiante.message}</span> : <span className='menssage'>telefono</span>}
                            </div>
                            <div className={`w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-0 mx-md-1 ${errors.correo_estudiante ? "error" : "bien"}`}>
                                <label className='h6 fw-bold cursor-pointer' htmlFor="correo_estudiante">Correo Electronico</label>
                                <input className='input-text bg-secundary' type="text" name="correo_estudiante" id="correo_estudiante"
                                    {...register("correo_estudiante", {
                                        required: {
                                            value: true,
                                            message: "Se requiere correo electronico"
                                        },
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
                                {errors.correo_estudiante ? <span className='menssage'>{errors.correo_estudiante.message}</span> : <span className='menssage'>Correo</span>}
                            </div>
                        </div>


                        <div className={`w-100 d-flex flex-column align-items-start justify-content-between my-2 ${errors.observaciones_estudiante ? "error" : "bien"}`}>
                            <label className='h6 fw-bold cursor-pointer' htmlFor="observaciones_estudiante">Observaciones</label>
                            <textarea name="observaciones_estudiante" id="observaciones_estudiante" cols="30" rows="10"
                                {...register("observaciones_estudiante", {
                                    maxLength: {
                                        value: 1000,
                                        message: "Máximo 1000 caracteres",
                                    },
                                })}
                            />
                            {errors.observaciones_estudiante ? <span className='menssage'>{errors.observaciones_estudiante.message}</span> : <span className='menssage'>Observaciones</span>}
                        </div>

                    </div>
                    <hr />

                    {/* ----------------------Datos de la Madre---------------------- */}
                    <Form_representante titulo={"Datos de la Madre"} id_form={"madre"} fecha={fecha} data_campos={data_campos} form={{ register, errors, watch, setValue }} />
                    <hr />

                    {/* ----------------------Datos del Padre---------------------- */}
                    <Form_representante titulo={"Datos del Padre"} id_form={"padre"} fecha={fecha} data_campos={data_campos} form={{ register, errors, watch, setValue }} />

                    {/* Contacto Alternativo */}
                    <div className='w-100 d-flex justify-content-center'>
                        <button onClick={(e) => { contactoAlternativo(e) }} className='btn btn-success button mt-4' type="button" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" ><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                            Agregar Contacto Alterno
                        </button>
                    </div>
                    <hr />
                    <div className="collapse" id="collapseExample">

                        {
                            representanteAlterno ?
                                (<Form_representante titulo={"Representante Alterno"} id_form={"alterno"} form={{ register, errors, watch, setValue }} fecha={fecha} data_campos={data_campos} isObligatorio={false} parentesco={true} />)
                                :
                                <></>
                        }
                        <hr />
                    </div>




                    {/* Representante Legal */}
                    <FormRepresentanteLegal titulo={"Representante Legal"} id_form={"RepresentanteLegal"} form={{ register, errors, watch, setValue }} fecha={fecha} data_campos={data_campos} parentesco={true} />

                    {/* Seccion de los datos academicos */}
                    <hr />
                    <h2 className='m-0 h4 fw-bold me-auto mb-2'>Documentos Entregados Para Inscripción</h2>

                    <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-around my-2 '>
                        <div className='d-felx flex-column w-md-100 w-50'>
                            <div className='d-flex my-2 mx-3 justify-content-between align-items-stretch'>
                                <label className={`mx-1 h6 m-0 fw-bold cursor-pointer ${errors.certificado_notas ? "error" : ""}`} htmlFor="certificado_notas">Certificado de Notas</label>
                                <input className='mx-2 form-check-input ' type="checkbox" id='certificado_notas' name='certificado_notas'
                                    {
                                    ...register("certificado_notas", {
                                        required: {
                                            value: true,
                                            message: "Este Documento es requerido"

                                        }
                                    })
                                    } />
                            </div>
                            <div className='d-flex my-2 mx-3 justify-content-between align-items-stretch'>
                                <label className={`mx-1 h6 m-0 fw-bold cursor-pointer ${errors.boleta_promocion ? "error" : ""}`} htmlFor="boleta_promocion">Boleta de Promoción</label>
                                <input className='mx-2 form-check-input ' type="checkbox" id='boleta_promocion' name='boleta_promocion'
                                    {
                                    ...register("boleta_promocion", {
                                        required: {
                                            value: true,
                                            message: "Este Documento es requerido"
                                        }
                                    })
                                    } />
                            </div>
                            <div className='d-flex my-2 mx-3 justify-content-between align-items-stretch'>
                                <label className={`mx-1 h6 m-0 fw-bold cursor-pointer ${errors.carta_buena_conducta ? "error" : ""}`} htmlFor="carta_buena_conducta">Carta de Buena Conducta</label>
                                <input className='mx-2 form-check-input ' type="checkbox" id='carta_buena_conducta' name='carta_buena_conducta'
                                    {
                                    ...register("carta_buena_conducta", {
                                        required: {
                                            value: true,
                                            message: "Este Documento es requerido"
                                        }
                                    })
                                    } />
                            </div>
                            <div className='d-flex my-2 mx-3 justify-content-between align-items-stretch'>
                                <label className='mx-1 h6 m-0 fw-bold cursor-pointer' htmlFor="fotocopia_ci_estudiante">Fotocopia C.I del Estudiante</label>
                                <input className='mx-2 form-check-input ' type="checkbox" id='fotocopia_ci_estudiante' name='fotocopia_ci_estudiante'
                                    {
                                    ...register("fotocopia_ci_estudiante")
                                    } />
                            </div>
                        </div>
                        <div className='d-felx flex-column w-md-100 w-50'>
                            <div className='d-flex my-2 mx-3 justify-content-between align-items-stretch'>
                                <label className={`mx-1 h6 m-0 fw-bold cursor-pointer ${errors.fotocopia_ci_representante ? "error" : ""}`} htmlFor="fotocopia_ci_representante">Fotocopia C.I del Representante</label>
                                <input className='mx-2 form-check-input ' type="checkbox" id='fotocopia_ci_representante' name='fotocopia_ci_representante'
                                    {
                                    ...register("fotocopia_ci_representante", {
                                        required: {
                                            value: true,
                                            message: "Este Documento es requerido"
                                        }
                                    })
                                    } />
                            </div>
                            <div className='d-flex my-2 mx-3 justify-content-between align-items-stretch'>
                                <label className={`mx-1 h6 m-0 fw-bold cursor-pointer ${errors.partida_nacimiento ? "error" : ""}`} htmlFor="partida_nacimiento">Original y Copia Partida de Nacimiento</label>
                                <input className='mx-2 form-check-input ' type="checkbox" id='partida_nacimiento' name='partida_nacimiento'
                                    {
                                    ...register("partida_nacimiento", {
                                        required: {
                                            value: true,
                                            message: "Este Documento es requerido"
                                        }
                                    })
                                    } />
                            </div>
                            <div className='d-flex my-2 mx-3 justify-content-between align-items-stretch'>
                                <label className='mx-1 h6 m-0 fw-bold cursor-pointer' htmlFor="fotos_representante">Fotos del Representante</label>
                                <input className='mx-2 form-check-input ' type="checkbox" id='fotos_representante' name='fotos_representante'
                                    {
                                    ...register("fotos_representante")
                                    } />
                            </div>
                            <div className='d-flex my-2 mx-3 justify-content-between align-items-stretch'>
                                <label className='mx-1 h6 m-0 fw-bold cursor-pointer' htmlFor="fotos_estudiante">Fotos del Estudiante</label>
                                <input className='mx-2 form-check-input ' type="checkbox" id='fotos_estudiante' name='fotos_estudiante'
                                    {
                                    ...register("fotos_estudiante")
                                    } />
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h2 className='m-0 h4 fw-bold me-auto mt-1 text-center'>Datos de Inscripción</h2>

                    <div className='w-70 d-flex align-items-center justify-content-between my-2 mx-auto'>
                        <div className={`w-40 d-flex flex-column mx-1 ${errors.año_esolarizacion ? "error" : ""}`}>
                            <label className='h6 fw-bold cursor-pointer' htmlFor="año_esolarizacion">Año</label>
                            <select className="form-select input-select" id="año_esolarizacion" aria-label="Large select example" name="año_esolarizacion" defaultValue={null}
                                {
                                ...register("año_esolarizacion", {

                                    validate: (value) => {
                                        if (value === "Año") {
                                            return "Año requerido"
                                        } else {
                                            return true
                                        }
                                    },
                                    onChange: (e) => { buscarseccion(e) }

                                })
                                }>
                                <option value={null} >Año</option>
                                {
                                    data_campos.años.length !== 0 ?
                                        data_campos.años.map(element => (
                                            <option key={`año_${element.año}`} value={element.id}>{element.año}° Año </option>
                                        )) :
                                        <></>
                                }
                            </select>
                        </div>
                        <div className={`w-40 d-flex flex-column mx-1 ${errors.seccionInscripcion ? "error" : ""}`}>
                            <label className='h6 fw-bold cursor-pointer' htmlFor="seccionInscripcion">Sección</label>
                            <select className="form-select input-select" id="seccionInscripcion" aria-label="Large select example" name="seccionInscripcion" defaultValue={null}
                                {
                                ...register("seccionInscripcion", {

                                    validate: (value) => {
                                        if (value === "Sección") {
                                            return "Sección Requeridad"
                                        } else {
                                            return true
                                        }
                                    },
                                    onChange: (e) => { buscarseccion(e) }
                                })
                                }>
                                <option value={null} >Sección</option>
                                {
                                    secciones.length !== 0 ?
                                        secciones.secciones.map(element => (
                                            <option key={`seccion_${element.id}`} value={element.id}>{element.seccion}</option>
                                        )) :
                                        <></>
                                }
                            </select>
                        </div>
                    </div>
                    {
                        secciones.length !== 0 ?
                            secciones.materiasAnteriores.length >= 1 ?
                                (
                                    <>
                                        <hr />
                                        <h2 className='m-0 h4 fw-bold me-auto mb-2'>Notas de las materias</h2>
                                    </>
                                ) : <></>
                            :
                            <></>
                    }
                    <div className='d-flex flex-wrap align-items-center justify-content-around w-100 px-1 mt-3 gap-3'>

                        {
                            secciones.length !== 0 ?
                                secciones.materiasAnteriores.map(e => (
                                    <Materias dataMateria={e} register={register} errors={errors} />
                                ))
                                :
                                <></>
                        }
                    </div>
                    <button type='submit' onClick={() => { console.log(errors); console.log(watch()) }} className='btn btn-success btn-lg  px-3 py-2 mt-5 mb-3 mx-auto ' id="button-submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"></path><path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"></path></svg>
                        Registrar
                    </button>
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
                            <button type='button' onClick={() => { navigate("/inicio") }} className="btn btn-success mx-auto" data-bs-dismiss="modal">Ir al Inicio</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nuevo_Ingreso