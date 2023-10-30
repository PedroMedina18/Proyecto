import { React, useState } from 'react'
import Modal_representante from './Modal_representante.jsx'
import { calcular_edad } from '../../js/funciones.js'

function FormRepresentanteLegal({ titulo, id_form, form, fecha, data_campos }) {
    const [stateDisable, setDisbale] = useState(false)
    const [stateDifunto, setDifunto] = useState(false)
    const [readOnly, setReadOnly] = useState(true)
    const [repre, setRepre]= useState(false)
    const { register, errors, setValue } = form


    // *funcion permitir el registro de un representnate cuando se a elegido uno externo
    const habilitarRepresentante = () => {
        const campos = [`nombres_${id_form}`, `apellidos_${id_form}`, `nacionalidad_${id_form}`, `cedula_${id_form}`, `genero_${id_form}`, `fecha_nacimiento_${id_form}`, `correo_${id_form}`, `telefono_${id_form}`, `telefono_alterno_${id_form}`, `profesion_${id_form}`, `id_${id_form}`, `fallecido_${id_form}`]
        campos.forEach(element => setValue(`${element}`, ""))
        document.getElementById(`input_externo_${id_form}`).classList.add("d-none")
        document.getElementById(`input_externo_${id_form}`).classList.remove("d-flex")
        const checkDisable = document.getElementById(`input_disable_${id_form}`)
        if (checkDisable) {
            checkDisable.classList.add("d-flex")
            checkDisable.classList.remove("d-none")
        }
        comprobarTipoRepresentante(id_form, false)
        setReadOnly(true)
        setRepre(false)
        setDifunto(false)
    }

    // *Fucnion que identifica si es la madre o el padre el representante legal colapsa la seccion
    const identificarRepresentante = (e) => {
        if (e.target.value === "madre" || e.target.value === "padre") {
            document.getElementById(`collapse_${id_form}`).classList.remove("show")
            setValue("disable_RepresentanteLegal", 0)
            setDisbale(true)
        } else {
            document.getElementById(`collapse_${id_form}`).classList.add("show")
            setValue("disable_RepresentanteLegal", 1)
            setDisbale(false)
        }
    }

    return (
        <div key={`form_${id_form}`} className='d-flex flex-column align-items-center justify-content-around position-relative '>
            <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center me-auto mb-2'>
                <h4 className='m-0 h4 fw-bold me-5 '>{titulo}</h4>

                <div className='d-flex mt-2 mt-md-0'>

                    <div className='d-none align-items-center' id={`input_externo_${id_form}`}>
                        <label htmlFor={`externo_${id_form}`} className='h6 m-0 fw-bold cursor-pointer'>Cambiar</label>
                        <input
                            type="checkbox" className='form-check-input ms-1' id={`externo_${id_form}`} name={`externo_${id_form}`}
                            {
                            ...register(`externo_${id_form}`, {
                                onChange: () => { habilitarRepresentante() }
                            })
                            }
                        />
                    </div>
                    <div key={`tipoRepresentantePadre`} className='d-flex align-items-center  inputRadioRepresentanteLegal'>
                        <label htmlFor="padre" className='h6 m-0 fw-bold cursor-pointer'>Padre</label>
                        <input type="radio" className='form-check-input ms-1' id="radio_padre" name="tipo-representante" defaultValue={`padre`}
                            {
                            ...register("tipo_representante", {
                                onChange: (e) => { identificarRepresentante(e) }
                            })
                            } />
                    </div>
                    <div key={`tipoRepresentanteMadre`} className='d-flex align-items-center ms-2 inputRadioRepresentanteLegal'>
                        <label htmlFor="madre" className='h6 m-0 fw-bold cursor-pointer'>Madre</label>
                        <input type="radio" className='form-check-input ms-1' id="radio_madre" name="tipo-representante" defaultValue={`madre`}
                            {
                            ...register("tipo_representante", {
                                onChange: (e) => { identificarRepresentante(e) }
                            })
                            } />
                    </div>
                    <div key={`tipoRepresentanteOtro`} className='d-flex align-items-center ms-2 inputRadioRepresentanteLegal'>
                        <label htmlFor="externo" className='h6 m-0 fw-bold cursor-pointer'>Externo</label>
                        <input type="radio" className='form-check-input ms-1' id="externo" name="tipo-representante" defaultValue={`externo`}
                            {
                            ...register("tipo_representante", {
                                onChange: (e) => { identificarRepresentante(e) }
                            })
                            } />
                    </div>

                    <input type="number" className='d-none'
                        {
                        ...register(`id_${id_form}`,{
                            required: {
                                value: (!stateDisable),
                                message: "No se ha seleccionado ningun representante Legal"
                            }
                        })
                        }
                    />
                </div>
            </div>

            {/* la seccion del modal para buscar el representante en la BD */}
            <Modal_representante id_modal={id_form} id_button={`btn_buscar_${id_form}`} form={form} difuntos={false} state={{ setReadOnly, setDifunto, stateDisable, setRepre}} funtion={{ comprobarTipoRepresentante }}
            />

            <div className="w-100 collapse show" id={`collapse_${id_form}`}>
                <div className='w-100 flex-column flex-md-row d-flex align-items-center justify-content-between my-4'>
                    {/* input nombre */}
                    <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${((errors[`nombres_${id_form}`]) && !stateDisable && !readOnly) ? "error" : "bien"}`} >
                        <label className='h6 fw-bold cursor-pointer' htmlFor={`nombres_${id_form}`}>{`Nombres`}</label>
                        <input className='input-text bg-secundary' type="text" name={`nombres_${id_form}`} id={`nombres_${id_form}`} disabled={stateDisable} readOnly={readOnly}
                            {...register(`nombres_${id_form}`, {
                                required: {
                                    value: !stateDisable,
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
                        {(errors[`nombres_${id_form}`] && !stateDisable) ? <span className='menssage'>{errors[`nombres_${id_form}`].message}</span> : <span className='menssage'>Ingrese sus dos nombres</span>}
                    </div>
                    <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${((errors[`apellidos_${id_form}`]) && !stateDisable && !readOnly) ? "error" : "bien"}`} >
                        <label className='h6 fw-bold cursor-pointer' htmlFor={`apellidos_${id_form}`}>{`Apellidos`}</label>
                        <input className='input-text bg-secundary' type="text" name={`apellidos_${id_form}`} id={`apellidos_${id_form}`} disabled={stateDisable} readOnly={readOnly}
                            {...register(`apellidos_${id_form}`, {
                                required: {
                                    value: !stateDisable,
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
                        {(errors[`apellidos_${id_form}`] && !stateDisable) ? <span className='menssage'>{errors[`apellidos_${id_form}`].message}</span> : <span className='menssage'>Ingrese sus dos nombres</span>}
                    </div>
                </div>

                <div className='w-100 flex-column flex-md-row d-flex align-items-center justify-content-between my-2'>

                    {/* input cedula */}
                    <div className={`w-55 w-md-100 d-flex flex-column ${((errors[`cedula_${id_form}`] || errors[`nacionalidad_${id_form}`]) && !stateDisable && !readOnly) ? "error" : "bien"}`}>
                        <div className='w-100 d-flex mx-1 align-items-center justify-content-between'>
                            <div className='d-flex align-items-center mt-3'>
                                <div className='form-check '>
                                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor={`V_${id_form}`}>V</label>
                                    <input className='form-check-input' type="radio" name={`nacionalidad_${id_form}`} id={`V_${id_form}`} defaultValue={"v"} disabled={(stateDisable || readOnly)} defaultChecked
                                        {
                                        ...register(`nacionalidad_${id_form}`, {
                                            validate: (e) => {
                                                if (!stateDisable) {
                                                    if (e === "v" || e === "e") {
                                                        return true
                                                    } else { return "se requiere la nacionalidad" }
                                                } else { return true }
                                            }
                                        })
                                        }
                                    />
                                </div>
                                <div className='form-check ms-2 '>
                                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor={`E_${id_form}`}>E</label>
                                    <input className='form-check-input' type="radio" name={`nacionalidad_${id_form}`} id={`E_${id_form}`} defaultValue={"e"} disabled={(stateDisable || readOnly)}
                                        {
                                        ...register(`nacionalidad_${id_form}`, {
                                            validate: (e) => {
                                                if (!stateDisable) {
                                                    if (e === "v" || e === "e") {
                                                        return true
                                                    } else { return "se requiere la nacionalidad" }
                                                } else { return true }
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className='d-flex flex-column ms-1 input-cedula'>
                                <label className='h6 fw-bold cursor-pointer' htmlFor={`cedula_${id_form}`}>Cedula</label>
                                <input className='input-text bg-secundary' type="number" name={`cedula_${id_form}`} id={`cedula_${id_form}`} readOnly={readOnly} disabled={stateDisable}
                                    {
                                    ...register(`cedula_${id_form}`, {
                                        maxLength: {
                                            value: 8,
                                            message: "Máximo 8 caracteres",
                                        },
                                        minLength: {
                                            value: 7,
                                            message: "Minimo 7 caracteres",
                                        },
                                        validate: (e) => {
                                            if (!stateDisable) {
                                                if (e === "") {
                                                    return "Se requiere la cedula"
                                                } else { return true }
                                            } else { return true }
                                        }

                                    })} />
                            </div>
                        </div>
                        {errors[`cedula_${id_form}`] ? <span className='menssage'>{errors[`cedula_${id_form}`].message}</span> : <span className='menssage'>Ingrese la cedula</span>}
                        {errors[`nacionalidad_${id_form}`] ? <span className='menssage'>{errors[`nacionalidad_${id_form}`].message}</span> : <></>}

                    </div>

                    {/* en esta sección si se pide parentesco genera una modificacion agregandolo  de lo contrario solo reguresa el genero */}
                    <div className='w-40 w-md-100 mt-2 mt-md-0 d-flex justify-content-between mx-1 '>
                        <div className={`d-flex flex-column w-45 ${(errors[`genero_${id_form}`] && !stateDisable && !readOnly) ? "error" : "bien"}`}>
                            <label className='h6 fw-bold cursor-pointer' htmlFor={`genero_${id_form}`}>Genero</label>
                            <select className="form-select input-select " aria-label="Large select example" name={`genero_${id_form}`} id={`genero_${id_form}`}  disabled={(stateDisable || readOnly)}
                                {
                                ...register(`genero_${id_form}`, {
                                    requerid: {
                                        value: !stateDisable,
                                        message: "Genero Requerido"
                                    },
                                    validate: (value) => {
                                        if ((value === "Genero" || value === "")&& !stateDisable) {
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
                                            <option key={`genero_${element.id}_${id_form}`} value={element.id}>{element.genero}</option>
                                        )) :
                                        <></>
                                }
                            </select>
                            {errors[`genero_${id_form}`] ? <span className='menssage'>{errors[`genero_${id_form}`].message}</span> : <span className='menssage'>Genero</span>}
                        </div>
                        <div className={`d-flex flex-column w-45 ${(errors[`parentesco_${id_form}`] && !stateDisable && !readOnly) ? "error" : "bien"}`}>
                            <label className='h6 fw-bold cursor-pointer' htmlFor={`parentesco_${id_form}`}>Parentesco</label>
                            <select className="form-select input-select " aria-label="Large select example" name={`parentesco_${id_form}`} id={`parentesco_${id_form}`} defaultValue={null} readOnly={readOnly} disabled={stateDisable}
                                {
                                ...register(`parentesco_${id_form}`, {
                                    requerid: {
                                        value: !stateDisable,
                                        message: "Parenstesco Requerido"
                                    },
                                    validate: (value) => {
                                        if (value === "Parenstesco" && !stateDisable) {
                                            return "Seleccione el Parenstesco"
                                        } else {
                                            return true
                                        }
                                    }
                                })}>
                                <option value={null}>Parenstesco</option>
                                {
                                    data_campos.parentescos.length !== 0 ?
                                        data_campos.parentescos.filter(e => { return (e.parentesco !== "Madre" && e.parentesco !== "Padre") }).map(element => (
                                            <option key={`parentesco_${element.parentesco}_${id_form}`} value={element.id}>{element.parentesco}</option>
                                        )) :
                                        <></>
                                }
                            </select>
                            {errors[`parentesco_${id_form}`] ? <span className='menssage'>{errors[`parentesco_${id_form}`].message}</span> : <span className='menssage'>Parentesco</span>}
                        </div>
                    </div>
                </div>

                <div className='w-100 flex-column flex-md-row d-flex align-items-center justify-content-between my-2'>
                    {/* fecha de nacimiento */}
                    <div className={`w-50 w-md-100 d-flex flex-column mx-1 ${(errors[`fecha_nacimiento_${id_form}`] && !stateDisable && !stateDifunto && !readOnly) ? "error" : "bien"}`}>
                        <label className='h6 fw-bold cursor-pointer' htmlFor={`fecha_nacimiento_${id_form}`}>Fecha de Nacimiento</label>
                        <input className='input-text bg-secundary' type="date" name={`fecha_nacimiento_${id_form}`} id={`fecha_nacimiento_${id_form}`} max={`${fecha.año}-${fecha.mes}-${fecha.dia}`} readOnly={readOnly} disabled={stateDisable || stateDifunto}
                            {...register(`fecha_nacimiento_${id_form}`, {
                                required: {
                                    value: (!stateDisable && !stateDifunto && !readOnly),
                                    message: "Se requiere la fecha de nacimiento",
                                },
                                validate: (value) => {
                                    const edad = calcular_edad(value, fecha.fecha_completa)
                                    if (edad < 20 || edad > 100) {
                                        return `${edad} Edad no permitidad para inscripción`
                                    }
                                }
                            })} />
                        {errors[`fecha_nacimiento_${id_form}`] ? <span className='menssage'>{errors[`fecha_nacimiento_${id_form}`].message}</span> : <span className='menssage'>Fecha de nacimiento</span>}
                    </div>
                    {/* Correo */}
                    <div className={`w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-0 mx-md-1 ${(errors[`correo_${id_form}`] && !stateDisable && !readOnly) ? "error" : "bien"}`}>
                        <label className='h6 fw-bold cursor-pointer' htmlFor={`correo_${id_form}`}>Correo Electronico</label>
                        <input className='input-text bg-secundary' type="text" name={`correo_${id_form}`} id={`correo_${id_form}`} readOnly={readOnly} disabled={stateDisable || stateDifunto}
                            {...register(`correo_${id_form}`, {
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
                        {errors[`correo_${id_form}`] ? <span className='menssage'>{errors[`correo_${id_form}`].message}</span> : <span className='menssage'>Correo</span>}
                    </div>
                </div>

                <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
                    <div className={`w-50 w-md-100 d-flex flex-column  mx-1 ${(errors[`telefono_${id_form}`] && !stateDisable && !stateDifunto && !readOnly) ? "error" : "bien"}`}>
                        <label className='h6 fw-bold cursor-pointer' htmlFor={`telefono_${id_form}`}>Telefono</label>
                        <input className='input-text bg-secundary' type="number" name={`telefono_${id_form}`} id={`telefono_${id_form}`} readOnly={readOnly} disabled={stateDisable || stateDifunto}
                            {...register(`telefono_${id_form}`, {
                                maxLength: {
                                    value: 11,
                                    message: "Solo se admiten 11 caracteres",
                                },
                                minLength: {
                                    value: 11,
                                    message: "Solo se admiten 11 caracteres",
                                },
                                required: {
                                    value: (!stateDisable && !stateDifunto),
                                    message: "Codigo requerido"
                                }
                            })}
                        />
                        {errors[`telefono_${id_form}`] ? <span className='menssage'>{errors[`telefono_${id_form}`].message}</span> : <span className='menssage'>telefono</span>}
                    </div>
                    <div className={`w-50 w-md-100 d-flex flex-column mt-md-0  mx-1 ${(errors[`telefono_alterno_${id_form}`] && !stateDisable && !readOnly) ? "error" : "bien"}`}>
                        <label className='h6 fw-bold cursor-pointer' htmlFor={`telefono_alterno_${id_form}`}>Telefono Alterno</label>
                        <input className='input-text bg-secundary' type="number" name={`telefono_alterno_${id_form}`} id={`telefono_alterno_${id_form}`} readOnly={readOnly} disabled={stateDisable || stateDifunto}
                            {...register(`telefono_alterno_${id_form}`, {
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
                        {errors[`telefono_alterno_${id_form}`] ? <span className='menssage'>{errors[`telefono_alterno_${id_form}`].message}</span> : <span className='menssage'>telefono</span>}
                    </div>
                </div>

                <div className='d-flex flex-column flex-sm-row align-items-center justify-content-between w-100 px-1'>
                    <div className={`w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column ${(errors[`profesion_${id_form}`] && !stateDisable && !stateDifunto && !readOnly) ? "error" : "bien"}`}>
                        <label className='h6 fw-bold cursor-pointer' htmlFor={`profesion_${id_form}`}>Profesión</label>
                        <input className='input-text bg-secundary' type="text" id={`profesion_${id_form}`} name={`profesion_${id_form}`} readOnly={readOnly} disabled={stateDisable || stateDifunto}
                            {
                            ...register(`profesion_${id_form}`, {
                                required: {
                                    value: (!stateDisable && !stateDifunto),
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
                        {errors[`profesion_${id_form}`] ? <span className='menssage'>{errors[`profesion_${id_form}`].message}</span> : <span className='menssage'>profesión</span>}

                    </div>
                    <div className={`d-flex flex-column align-items-center w-50 w-md-100 ${(errors[`lopna_${id_form}`] && !stateDisable) ? "error" : "bien"}`}>
                        <div className='d-flex justify-content-center ms-2 w-100 '>
                            <label htmlFor={`lopna_${id_form}`} className='h5 m-0 fw-bold cursor-pointer'>Carta de la lopna</label>
                            <input type="checkbox" className='form-check-input ms-1' id={`lopna_${id_form}`} name={`lopna_${id_form}`}
                                {
                                ...register(`lopna_${id_form}`, {
                                    requerid: {
                                        value: (!stateDisable),
                                        message: "Carta de la lopna requeridad"
                                    }
                                })
                                }
                            />
                        </div>
                        {errors[`lopna_${id_form}`] ? <span className='menssage'>{errors[`lopna_${id_form}`].message}</span> : <></>}
                    </div>
                </div>
                <div className={`d-flex w-100 mt-2 ${(errors[`id_${id_form}`] && !stateDisable && !repre) ? "error" : "bien"}`}>
                    {(errors[`id_${id_form}`] && !stateDisable) ? <span className='menssage lg mx-auto '>{errors[`id_${id_form}`].message}</span> : <></>}
                </div>
            </div>
        </div>
    )
}

// esta funsion solo comprueba si existe algun input type radio y los elimina o los coloca dependiendo de la eleccion
const comprobarTipoRepresentante = (id, remove) => {
    const TipoRepresentante = document.querySelectorAll(`.inputRadio${id}`)
    if (TipoRepresentante.length !== 0) {
        if (remove) {
            TipoRepresentante.forEach(element => {
                element.classList.remove("d-flex")
                element.classList.add("d-none")
            })
        } else {
            TipoRepresentante.forEach(element => {
                element.classList.remove("d-none")
                element.classList.add("d-flex")
            })
        }
    }
}

export default FormRepresentanteLegal