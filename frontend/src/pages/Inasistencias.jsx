import { useEffect, useState } from 'react'
import Navbar from '../components/universal/Navbar'

function Inasistencias() {
    const [fecha, setFecha] = useState({ dia: null, mes: null, año: null })
    useEffect(() => {
        const fecha_actual = new Date()
        setFecha({
            ...fecha,
            dia: Number(fecha_actual.getDate()),
            mes: Number(fecha_actual.getMonth() + 1),
            año: Number(fecha_actual.getFullYear())
        })
    }, [])
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='w-100 bg-light d-flex flex-column align-items-center justify-content-center px-2 px-md-5 pt-5'>
                <section className='form-nuevo-ingreso border border-2 border-secundary w-100 py-2 px-3' >
                    <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between'>
                        <h1 className='m-0 h3 fw-bold'>Registro de Inasistencias 5to B Matemática</h1>
                        <p className='m-0 mt-2 mt-md-0 fw-semibold'>Fecha: {fecha.año ? `${fecha.dia}/${fecha.mes}/${fecha.año}` : "-"}</p>
                        <p className='m-0 mt-2 mt-md-0 fw-semibold'>Periodo:Inscripciones</p>
                    </div>
                    <hr />

                    <div className='mt-2 '>
                        <div className='d-flex ms-auto my-4 fw-bold align-items-center container-mes'>
                            <label  className='me-3' htmlFor="mes">Mes</label>
                            <select className="form-select  " aria-label="Large select example" name="mes" id="mes" >
                                <option value="Septiembre">Septiembre</option>
                                <option value="Obtubre">Obtubre</option>
                                <option value="Noviembre">Noviembre</option>
                                <option value="Diciembre">Diciembre</option>
                                <option value="Enero">Enero</option>
                                <option value="Febrero">Febrero</option>
                                <option value="Marzo">Marzo</option>
                                <option value="Abril">Abril</option>
                                <option value="Mato">Mato</option>
                                <option value="Junio">Junio</option>
                                <option value="Julio">Julio</option>
                            </select>
                        </div>
                        <div className='container-table'>
        
                        <table className='tabla-inasistenica'>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>C.I</th>
                                    <th>Nombre</th>
                                    <th>10-10-2023</th>
                                    <th>12-10-2023</th>
                                    <th>14-10-2023</th>
                                    <th>18-10-2023</th>
                                    <th>20-10-2023</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <td>30.565.353</td>
                                    <td>Pedro Egnis Medina Camacho</td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                </tr>


                            </tbody>
                        </table>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Inasistencias