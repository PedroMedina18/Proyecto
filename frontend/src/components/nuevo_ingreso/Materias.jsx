import React from 'react'

function Materias({ dataMateria, register, errors }) {
    return (
        <div key={`${dataMateria.año}_Año`} className={`d-flex flex-column justify-content-center p-3 border border-dark border-2 rounded align-self-stretch`}>
            <h6 className='mx-auto h5 fw-bold'>{dataMateria.año}° Año</h6>
            {
                dataMateria.materias.map(e => (
                    <div key={`materia_${e.id}`} className={`d-flex flex-column align-items-end mb-1 ${errors[`materia_${e.id}`]? "error" : "bien"}`}>
                        <div  className={`h6 fw-bold cursor-pointer w-100 d-flex align-items-center m-0`}>
                            <label className='w-80' htmlFor={`materia_${e.id}`}>{e.nombre}</label>
                            <input type="number" id={`materia_${e.id}`} className='w-20 input-text materia' data-materia={e.id}
                                {
                                ...register(`materia_${e.id}`, {
                                    required: {
                                        value: true,
                                        message: "Nota requerida"
                                    },
                                    max: {
                                        value: 20,
                                        message: "Nota maxima 20"
                                    },
                                    min: {
                                        value: 10,
                                        message: "Nota minima 10"
                                    }
                                })
                                } />
                        </div>
                        {errors[`materia_${e.id}`] ? <span className='menssage'>{errors[`materia_${e.id}`].message}</span> : <span className='menssage'>Materia</span>}
                    </div>
                ))
            }
        </div>
    )
}

export default Materias