import { useEffect, useState } from 'react'
import Navbar from '../components/universal/Navbar'

function Registro_Notas() {
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
                        <h1 className='m-0 h3 fw-bold'>5to B Matemática</h1>
                        <p className='m-0 mt-2 mt-md-0 fw-semibold'>Fecha: {fecha.año ? `${fecha.dia}/${fecha.mes}/${fecha.año}` : "-"}</p>
                        <p className='m-0 mt-2 mt-md-0 fw-semibold'>Periodo:Inscripciones</p>
                    </div>
                    <hr />

                    <div className='mt-2 '>

                        <div className='container-table'>

                            <table className='tabla-notas'>
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>C.I</th>
                                        <th>Nombre</th>
                                        <th className=''>
                                            <div className='d-flex flex-column actividad'>
                                                <span>Actividad #</span>
                                                <span>15%</span>
                                                <span>15-10-2023</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className='d-flex flex-column'>
                                                <span>Actividad #</span>
                                                <span>15%</span>
                                                <span>15-10-2023</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className='d-flex flex-column'>
                                                <span>Actividad #</span>
                                                <span>15%</span>
                                                <span>15-10-2023</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className='d-flex flex-column'>
                                                <span>Actividad #</span>
                                                <span>15%</span>
                                                <span>15-10-2023</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className='d-flex flex-column'>
                                                <span>Actividad #</span>
                                                <span>15%</span>
                                                <span>15-10-2023</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className='d-flex flex-column'>
                                                <span>Actividad #</span>
                                                <span>15%</span>
                                                <span>15-10-2023</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className='d-flex flex-column'>
                                                <span>Actividad #</span>
                                                <span>15%</span>
                                                <span>15-10-2023</span>
                                            </div>
                                        </th>
                                        <th>
                                            <div className='d-flex flex-column'>
                                                <span>Actividad #</span>
                                                <span>15%</span>
                                                <span>15-10-2023</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <td>30.565.353</td>
                                        <td>Pedro Egnis Medina Camacho</td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
                                        <td><input className="" type="number" /></td>
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

export default Registro_Notas