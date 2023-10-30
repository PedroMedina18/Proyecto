import { React, useState } from 'react'
import { buscarRepresentantes } from '../../js/servidor.js'
function Modal_representante({ id_modal, id_button, form, difuntos, state, funtion }) {
    const [representantes, setRepresentantes] = useState([])
    const [error, setError] = useState()
    const { setValue } = form
    const { setReadOnly, setDifunto, stateDisable, setRepre } = state
    const {comprobarTipoRepresentante}=funtion
    // funcion encargadad de buscar los representantes en la base de datos
    const buscarRepresentante = async () => {
        const valueInput = document.getElementById(`input_${id_modal}`).value
        const regexCedula = /^[\d]{5,8}$/
        const regexNombre = /^[a-zA-ZÁ-ÿ\s]+$/
        if (valueInput === "") {
            setError("No se detecto ningun dato")
            return
        }
        if (regexCedula.test(valueInput) || regexNombre.test(valueInput)) {
            document.getElementById(`buttonSerch_${id_modal}`).disabled = true
            try {
                const result = await buscarRepresentantes(valueInput)
                if (result) {
                    document.getElementById(`buttonSerch_${id_modal}`).disabled = false
                }
                if (difuntos) {
                    setRepresentantes(result.data.result)
                } else {
                    const representantesFilter = result.data.result.filter(e => e.fallecido == 0)
                    setRepresentantes(representantesFilter)
                }
            } catch (error) {

                console.log(error)
            }
            setError(undefined)
        } else {
            setError("Por favor Verifique, patron no permitido")
        }

    }

    // funcion encargada de colocar los datos de la base de datos en el formulario
    const agregarDatos = (datos) => {
        setReadOnly(true)
        setRepre(true)
        setValue(`id_${id_modal}`, datos.id)
        setValue(`nombres_${id_modal}`, datos.nombres)
        setValue(`apellidos_${id_modal}`, datos.apellidos)
        setValue(`nacionalidad_${id_modal}`, datos.nacionalidad? "v":"e")
        setValue(`cedula_${id_modal}`, datos.cedula)
        setValue(`genero_${id_modal}`, datos.genero_id)
        if (!datos.fallecido) {
            setDifunto(false)
            setValue(`fallecido_${id_modal}`, datos.fallecido)
            const checkFallecido = document.getElementById(`fallecido_${id_modal}`)
            checkFallecido ? checkFallecido.checked = false : ""
            setValue(`correo_${id_modal}`, datos.correo ? datos.correo : "")
            setValue(`fecha_nacimiento_${id_modal}`, datos.fecha_nacimiento)
            setValue(`telefono_${id_modal}`, datos.telefono)
            setValue(`telefono_alterno_${id_modal}`, datos.telefono_alterno ? datos.telefono_alterno : "")
            setValue(`profesion_${id_modal}`, datos.profesion)
        } else {
            setDifunto(true)
            setValue(`${form.fallecido}`, datos.fallecido)
            const checkFallecido = document.getElementById(`fallecido_${id_modal}`)
            checkFallecido ? checkFallecido.checked = true : ""
            setValue(`fecha_nacimiento_${id_modal}`, "")
            setValue(`correo_${id_modal}`, "")
            setValue(`telefono_${id_modal}`, "")
            setValue(`telefono_alterno_${id_modal}`, "")
            setValue(`profesion_${id_modal}`, "")
        }

        setValue(`externo_${id_modal}`, 1)
        document.getElementById(`externo_${id_modal}`).checked = true
        document.getElementById(`input_externo_${id_modal}`).classList.add("d-flex")
        document.getElementById(`input_externo_${id_modal}`).classList.remove("d-none")
        comprobarTipoRepresentante(id_modal, true)
        const checkDisable = document.getElementById(`input_disable_${id_modal}`)
        if (checkDisable) {
            checkDisable.classList.remove("d-flex")
            checkDisable.classList.add("d-none")
        }

    }
    return (
        <>
            <button id={`${id_button}`} className='btn btn-info button object-right' type='button' disabled={stateDisable}
                data-bs-toggle="modal" data-bs-target={`#modal_${id_modal}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" ><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path></svg>
                Buscar
            </button>
            <div className="modal fade" id={`modal_${id_modal}`} tabIndex="-1" aria-labelledby={`title_${id_modal}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title fs-4 text-center " id={`title_${id_modal}`}>Buscar Representante</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column  align-items-center">
                            <div className={`d-flex flex-column justify-content-between w-70 w-lg-100 ${error ? "error" : ""}`}>
                                <div className='w-100 d-flex '>
                                    <input  onKeyPress ={(e)=>{if(e.charCode==13){buscarRepresentante()}}} className="input-busquedad" type="text" id={`input_${id_modal}`} />
                                    <button onClick={() => { buscarRepresentante() }} id={`buttonSerch_${id_modal}`} type='button' className="btn btn-primary btn-sm px-3 ms-3">Buscar</button>
                                </div>
                                {
                                    error ?
                                        (<span className='menssage'>{error}</span>)
                                        :
                                        (<></>)
                                }
                            </div>
                            <div className=' container-result '>
                                {
                                    representantes.length !== 0 ?
                                        representantes.map((element, index) => (
                                            <p onClick={() => { agregarDatos(element) }} data-bs-dismiss="modal" className='optines' key={`${index}_${id_modal}`}><span>{element.cedula}</span> <span>{`${element.nombres} ${element.apellidos}`}</span></p>
                                        ))

                                        :
                                        (<span className='m-auto fs-3 fw-semibold'>No hay resultados</span>)
                                }
                            </div>
                        </div>
                        <div className="modal-footer ">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Modal_representante