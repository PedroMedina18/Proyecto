import { useEffect, useState } from 'react'
import Navbar from '../components/universal/Navbar'

function Reinscripcion() {
  const [fecha, setFecha] = useState({ dia: null, mes: null, año: null })
  const [cambioRepresentante, setcambioRepresentante] = useState(false)
  useEffect(() => {
    const fecha_actual = new Date()
    setFecha({
      ...fecha,
      dia: Number(fecha_actual.getDate()),
      mes: Number(fecha_actual.getMonth() + 1),
      año: Number(fecha_actual.getFullYear())
    })
  }, [])

  const cambio = (e) => {
    setcambioRepresentante(e.target.checked)
  }
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='w-100 bg-light d-flex flex-column align-items-center justify-content-center px-2 px-md-5 pt-5'>
        <form className='form-nuevo-ingreso border border-2 border-secundary w-100 py-2 px-3'>
          {/* ----------------------Datos del Estudiante---------------------- */}

          <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between'>
            <h1 className='m-0 h3 fw-bold'>Reinscripción</h1>
            <p className='m-0 mt-2 mt-md-0 fw-semibold'>Fecha: {fecha.año ? `${fecha.dia}/${fecha.mes}/${fecha.año}` : "-"}</p>
            <p className='m-0 mt-2 mt-md-0 fw-semibold'>Periodo:Inscripciones</p>
          </div>
          <hr />
          <div className='d-flex flex-column align-items-center justify-content-around position-relative'>
            <h2 className='m-0 h4 fw-bold me-auto mb-2'>Estudiante</h2>
            <button id="btn-buscar-padre" className='btn btn-info button object-right'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" ><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path></svg>
            </button>
            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className='w-50 w-md-100 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="nombres-estudiante">Nombre</label>
                <input disabled className='input-text bg-secundary' type="text" name="nombres-estudiante" id="nombres-estudiante" />
              </div>
              <div className='w-50 w-md-100 d-flex flex-column mx-1 '>
                <label className='h6 fw-bold cursor-pointer' htmlFor="genero-estudiante">Genero</label>
                <select disabled className="form-select input-select" id="genero-estudiante" aria-label="Large select example" name="genero-estudiante" defaultValue={null}>
                  <option value={null} >Genero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>

            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className='w-55 w-md-100 d-flex mx-1 align-items-center justify-content-between'>
                <div className='d-flex align-items-center mt-3'>
                  <div className='form-check '>
                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="V-estudiante">V</label>
                    <input disabled className='form-check-input' type="radio" name="nacionalidad-estudiante" id='V-estudiante' />
                  </div>
                  <div className='form-check ms-2 '>
                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="E-estudiante">E</label>
                    <input disabled className='form-check-input' type="radio" name="nacionalidad-estudiante" id='E-estudiante' />
                  </div>

                </div>
                <div className='d-flex flex-column mx-1 input-cedula'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="cedula-estudiante">Cedula</label>
                  <input disabled className='input-text bg-secundary' type="number" name="cedula-estudiante" id="cedula-estudiante" />
                </div>
                <input disabled onChange={(e) => { dissableCedula(e) }} className='form-check-input ms-2 mt-3' type="checkbox" id='Propia' />
              </div>
              <div className='w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="correo-padre">Correo</label>
                <input disabled className='input-text bg-secundary' type="text" name="correo-padre" id="correo-padre" />
              </div>
            </div>
            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className="w-50 w-md-100 d-flex mx-1">
                <div className='d-flex flex-column  input-codigo-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="codigo-telefono-estudiante">Codigo Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="codigo-telefono-estudiante" id="codigo-telefono-estudiante" />
                </div>
                <div className='d-flex flex-column ms-1 input-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="telefono-estudiante">Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="telefono-estudiante" id="telefono-estudiante" />
                </div>
              </div>
              <div className='w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-0 mx-md-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="correo-estudiante">Correo</label>
                <input disabled className='input-text bg-secundary' type="text" name="correo-estudiante" id="correo-estudiante" />
              </div>
            </div>

          </div>
          <hr />

          {/* ----------------------Datos del Padre---------------------- */}
          <div className='d-flex flex-column align-items-center justify-content-around position-relative '>

            <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center me-auto mb-2'>
              <h2 className='m-0 h4 fw-bold me-5 '>Datos del Padre</h2>
              <div className='d-flex mt-2 mt-md-0'>

                <div className='d-flex align-items-center ms-2'>
                  <label htmlFor="difunto-padre" className='h6 m-0 fw-bold cursor-pointer'>Difunto</label>
                  <input disabled onChange={(e) => { dissableRepresentanteDifunto(e, "padre") }} type="checkbox" className='form-check-input ms-1' id="difunto-padre" name="difunto-padre" />
                </div>
              </div>
            </div>
            <div className='w-100 flex-column flex-md-row d-flex align-items-center justify-content-between my-4'>
              <div className='w-50 w-md-100 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="nombres-padre">Nombre</label>
                <input disabled className='input-text bg-secundary' type="text" name="nombres-padre" id="nombres-padre" />
              </div>


              <div className='w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-1 '>
                <label className='h6 fw-bold cursor-pointer' htmlFor="genero-padre">Genero</label>
                <select disabled className="form-select input-select " aria-label="Large select example" name="genero-padre" id="genero-padre" defaultValue={null}>
                  <option value={null}>Genero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>

            <div className='w-100 flex-column flex-md-row d-flex align-items-center justify-content-between my-2'>
              <div className='w-55 w-md-100 d-flex mx-1 align-items-center justify-content-between'>
                <div className='d-flex align-items-center mt-3'>
                  <div className='form-check '>
                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="V-padre">V</label>
                    <input disabled className='form-check-input' type="radio" name="nacionalidad-padre" id='V-padre' />
                  </div>
                  <div className='form-check ms-2 '>
                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="E-padre">E</label>
                    <input disabled className='form-check-input' type="radio" name="nacionalidad-padre" id='E-padre' />
                  </div>

                </div>
                <div className='d-flex flex-column ms-1 input-cedula'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="cedula-padre">Cedula</label>
                  <input disabled className='input-text bg-secundary' type="number" name="cedula-padre" id="cedula-padre" />
                </div>
              </div>
              <div className='w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="correo-padre">Correo</label>
                <input disabled className='input-text bg-secundary' type="text" name="correo-padre" id="correo-padre" />
              </div>
            </div>
            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className="w-50 w-md-100 d-flex mx-1">
                <div className='d-flex flex-column me-1 input-codigo-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="codigo-telefono-representante-legal-1">Codigo Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="codigo-telefono-representante-legal-1" id="codigo-telefono-representante-legal-1" />
                </div>
                <div className='d-flex flex-column ms-1 input-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="telefono-representante-legal-1">Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="telefono-representante-legal-1" id="telefono-representante-legal-1" />
                </div>
              </div>
              <div className="w-50 w-md-100 mt-2 mt-md-0 d-flex mx-1">
                <div className='d-flex flex-column me-1 input-codigo-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="codigo-telefono-representante-legal-2">Codigo Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="codigo-telefono-representante-legal-2" id="codigo-telefono-representante-legal-2" />
                </div>
                <div className='d-flex flex-column ms-1 input-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="telefono-madre-2">Telefono Alterno</label>
                  <input disabled className='input-text bg-secundary' type="number" name="telefono-representante-legal-2" id="telefono-representante-legal-2" />
                </div>
              </div>
            </div>
          </div>
          <hr />

          {/* ----------------------Datos de la Madre---------------------- */}
          <div className='d-flex flex-column align-items-center justify-content-around position-relative content-display-right'>

            <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center me-auto mb-2'>
              <h2 className='m-0 h4 fw-bold me-5'>Datos de la Madre</h2>
              <div className='d-flex mt-2 mt-md-0'>

                <div className='d-flex align-items-center ms-2'>
                  <label htmlFor="difunto-madre" className='h6 m-0 fw-bold cursor-pointer'>Difunto</label>
                  <input disabled onChange={(e) => { dissableRepresentanteDifunto(e, "madre") }} type="checkbox" className='form-check-input ms-1' id="difunto-madre" name="difunto-madre" />
                </div>
              </div>
            </div>

            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-4'>
              <div className='w-50 w-md-100 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="nombres-madre">Nombre</label>
                <input disabled className='input-text bg-secundary' type="text" name="nombres-madre" id="nombres-madre" />
              </div>
              <div className='w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-1 '>
                <label className='h6 fw-bold cursor-pointer' htmlFor="genero-madre">Genero</label>
                <select disabled className="form-select input-select " aria-label="Large select example" name="genero-madre" id="genero-madre" defaultValue={null}>
                  <option value={null}>Genero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>

            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className='w-55 w-md-100 d-flex mx-1 align-items-center justify-content-between'>
                <div className='d-flex align-items-center mt-3'>
                  <div className='form-check '>
                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="V-madre">V</label>
                    <input disabled className='form-check-input' type="radio" name="nacionalidad-madre" id='V-madre' />
                  </div>
                  <div className='form-check ms-2 '>
                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="E-madre">E</label>
                    <input disabled className='form-check-input' type="radio" name="nacionalidad-madre" id='E-madre' />
                  </div>
                </div>
                <div className='d-flex flex-column ms-1 input-cedula'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="cedula-madre">Cedula</label>
                  <input disabled className='input-text bg-secundary' type="number" name="cedula-madre" id="cedula-madre" />
                </div>

              </div>
              <div className='w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="correo-madre">Correo</label>
                <input disabled className='input-text bg-secundary' type="text" name="correo-madre" id="correo-madre" />
              </div>
            </div>



            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className="w-50 w-md-100 d-flex mx-1">
                <div className='d-flex flex-column me-1 input-codigo-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="codigo-telefono-representante-legal-1">Codigo Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="codigo-telefono-representante-legal-1" id="codigo-telefono-representante-legal-1" />
                </div>
                <div className='d-flex flex-column ms-1 input-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="telefono-representante-legal-1">Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="telefono-representante-legal-1" id="telefono-representante-legal-1" />
                </div>
              </div>
              <div className="w-50 w-md-100 mt-2 mt-md-0 d-flex mx-1">
                <div className='d-flex flex-column me-1 input-codigo-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="codigo-telefono-representante-legal-2">Codigo Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="codigo-telefono-representante-legal-2" id="codigo-telefono-representante-legal-2" />
                </div>
                <div className='d-flex flex-column ms-1 input-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="telefono-madre-2">Telefono Alterno</label>
                  <input disabled className='input-text bg-secundary' type="number" name="telefono-representante-legal-2" id="telefono-representante-legal-2" />
                </div>
              </div>
            </div>
          </div>
          <hr />

          {/* ----------------------Datos del Representante Legal---------------------- */}
          <div className='d-flex flex-column align-items-center justify-content-around position-relative content-display-right'>

            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center me-auto mb-2'>
              <h2 className='m-0 h4 fw-bold me-2'>Datos del Representante Legal</h2>
              <div className='d-flex mt-2 mt-lg-0'>
                <div className='d-flex align-items-center ms-2'>
                  <label htmlFor="externo" className='h6 m-0 me-2 fw-bold cursor-pointer'>Cambio de representante</label>
                  <input disabled onChange={(e) => { cambio(e) }} type="checkbox" className='form-check-input ms-1' id="externo" name="cambio" defaultChecked />
                </div>
                {
                  cambioRepresentante ?
                    (
                      <>
                        <div className='d-flex align-items-center '>
                          <label htmlFor="padre" className='h6 m-0 fw-bold cursor-pointer'>Padre</label>
                          <input disabled onChange={(e) => { }} type="radio" className='form-check-input ms-1' id="padre" name="tipo-representante" />
                        </div>
                        <div className='d-flex align-items-center ms-2'>
                          <label htmlFor="madre" className='h6 m-0 fw-bold cursor-pointer'>Madre</label>
                          <input disabled onChange={(e) => { }} type="radio" className='form-check-input ms-1' id="madre" name="tipo-representante" />
                        </div>
                        <div className='d-flex align-items-center ms-2'>
                          <label htmlFor="externo" className='h6 m-0 fw-bold cursor-pointer'>Externo</label>
                          <input disabled onChange={(e) => { }} type="radio" className='form-check-input ms-1' id="externo" name="tipo-representante" defaultChecked />
                        </div>
                      </>
                    ) :
                    (<></>)
                }


              </div>
            </div>
            <button id="btn-buscar-representante-legal" className='btn btn-info button object-right' disabled>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" ><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path></svg>
            </button>

            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-4'>
              <div className='w-50 w-md-100 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="nombres-representante-legal">Nombres</label>
                <input disabled className='input-text bg-secundary' type="text" name="nombres-representante-legal" id="nombres-representante-legal" />
              </div>
              <div className='w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="apellidos-madre">Apellidos</label>
                <input disabled className='input-text bg-secundary' type="text" name="apellidos-representante-legal" id="apellidos-representante-legal" />
              </div>
            </div>

            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className='w-55 w-md-100 d-flex mx-1 align-items-center justify-content-between'>
                <div className='d-flex align-items-center mt-3'>
                  <div className='form-check '>
                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="V-representante-legal">V</label>
                    <input disabled className='form-check-input' type="radio" name="nacionalidad-representante-legal" id='V-representante-legal' />
                  </div>
                  <div className='form-check ms-2 '>
                    <label className='form-check-label h6 fw-bold cursor-pointer' htmlFor="E-representante-legal">E</label>
                    <input disabled className='form-check-input' type="radio" name="nacionalidad-representante-legal" id='E-representante-legal' />
                  </div>
                </div>
                <div className='d-flex flex-column ms-1 input-cedula'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="cedula-representante-legal">Cedula</label>
                  <input disabled className='input-text bg-secundary' type="number" name="cedula-representante-legal" id="cedula-representante-legal" />
                </div>
              </div>
              <div className='w-40 d-flex mt-2 mt-md-0 w-md-100 justify-content-between mx-1 '>

                <div className='d-flex flex-column w-45'>

                  <label className='h6 fw-bold cursor-pointer' htmlFor="genero-representante-legal">Genero</label>
                  <select disabled className="form-select input-select " aria-label="Large select example" name="genero-representante-legal" id="genero-representante-legal" defaultValue={null}>
                    <option value={null}>Genero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>
                <div className='d-flex flex-column w-45'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="genero-padre">Parentesco</label>
                  <select disabled className="form-select input-select " aria-label="Large select example" name="genero-padre" id="genero-padre" defaultValue={null}>
                    <option value={null}>Parentesco</option>
                    <option value="Tio">Tio</option>
                    <option value="Tio">Tio</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className='w-50 w-md-100 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="fecha_nacimiento_representante-legal">Fecha de Nacimiento</label>
                <input disabled className='input-text bg-secundary' type="date" name="fecha_nacimiento_representante-legal" id="fecha_nacimiento_representante-legal" />
              </div>
              <div className='w-50 w-md-100 mt-2 mt-md-0 d-flex flex-column mx-1'>
                <label className='h6 fw-bold cursor-pointer' htmlFor="correo-representante-legal">Correo</label>
                <input disabled className='input-text bg-secundary' type="text" name="correo-representante-legal" id="correo-representante-legal" />
              </div>
            </div>

            <div className='w-100 d-flex flex-column flex-md-row align-items-center justify-content-between my-2'>
              <div className="w-50 w-md-100 d-flex mx-1">
                <div className='d-flex flex-column me-1 input-codigo-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="codigo-telefono-representante-legal-1">Codigo Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="codigo-telefono-representante-legal-1" id="codigo-telefono-representante-legal-1" />
                </div>
                <div className='d-flex flex-column ms-1 input-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="telefono-representante-legal-1">Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="telefono-representante-legal-1" id="telefono-representante-legal-1" />
                </div>
              </div>
              <div className="w-50 w-md-100 mt-2 mt-md-0 d-flex mx-1">
                <div className='d-flex flex-column me-1 input-codigo-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="codigo-telefono-representante-legal-2">Codigo Telefono</label>
                  <input disabled className='input-text bg-secundary' type="number" name="codigo-telefono-representante-legal-2" id="codigo-telefono-representante-legal-2" />
                </div>
                <div className='d-flex flex-column ms-1 input-telefono'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="telefono-madre-2">Telefono Alterno</label>
                  <input disabled className='input-text bg-secundary' type="number" name="telefono-representante-legal-2" id="telefono-representante-legal-2" />
                </div>
              </div>
            </div>

            <div className='d-flex flex-column flex-sm-row align-items-center justify-content-around w-100 px-1'>
              <button  id="btn-buscar-profesion-representante-legal" className='btn btn-info button ' disabled>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" ><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path></svg>
                Buscar Profesión
              </button>
              <div id='container-profesion-representante-legal' className='container-profesion'>

              </div>
            </div>
            <div className='w-100 d-flex flex-column my-2'>
              <h1 className='mb-2 h4 fw-bold me-5'>Carta de la lopna</h1>
              <div className='w-100 d-flex justify-content-between'>

                <div className='w-50 d-flex flex-column mx-1'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="codigo-carta-lopna">Codigo Identificación</label>
                  <input disabled className='input-text bg-secundary' type="number" name='codigo-carta-lopna' id='codigo-carta-lopna' />
                </div>
                <div className='w-50 d-flex flex-column mx-1'>
                  <label className='h6 fw-bold cursor-pointer' htmlFor="fecha-expedicion">Fecha Expedición</label>
                  <input disabled className='input-text bg-secundary' type="date" name='fecha-expedicion' id='fecha-expedicion' />
                </div>
              </div>
            </div>
          </div>
          <hr />
          

      <h2 className='m-0 h4 fw-bold me-auto mb-2'>Datos de Inscripción</h2>

      <div className='w-100 d-flex align-items-center justify-content-between my-2'>
        <div className='w-40 d-flex flex-column mx-1 '>
          <label className='h6 fw-bold cursor-pointer' htmlFor="año-inscripcion">Año</label>
          <select className="form-select input-select" id="año-inscripcion" aria-label="Large select example" name="año-inscripcion" defaultValue={null}>
            <option value={null} >Año</option>
            <option value="1er">1er</option>
            <option value="2do">2do</option>
            <option value="3ro">3ro</option>
            <option value="4to">4to</option>
            <option value="5to">5to</option>
            <option value="6to">6to</option>
          </select>
        </div>
        <div className='w-40 d-flex flex-column mx-1 '>
          <label className='h6 fw-bold cursor-pointer' htmlFor="año-seccion">Sección</label>
          <select className="form-select input-select" id="año-seccion" aria-label="Large select example" name="año-seccion" defaultValue={null}>
            <option value={null} >Sección</option>
            <option value="1er">A</option>
            <option value="2do">B</option>
            <option value="3ro">C</option>
            <option value="4to">D</option>
            <option value="5to">E</option>
          </select>
        </div>
      </div>
      <div className='d-flex flex-column flex-sm-row align-items-center justify-content-around w-100 px-1 mt-3'>
        <label className='h3 fw-bold '>Materias</label>
        <div id='container-materias' className='container-materias'>

        </div>
      </div>
        </form>
      </main>
    </>
  )
}

export default Reinscripcion