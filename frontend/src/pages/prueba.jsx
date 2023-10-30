import { React, useState } from 'react';
import { useForm } from 'react-hook-form';

function Prueba() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [disabled, setDisabled] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
        console.log("hello")
    };


    const onChangeCheck = (e) => {
        setDisabled(e.target.checked);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nombre">Nombre:</label>
            <input
                id="nombre"
                type="text"
                name="nombre"
                {
                ...register("nombre", {
                    required: {
                        value: !disabled
                    }
                })
                }
                disabled={disabled}
            />

            {(errors.nombre && !disabled) ? <p>El nombre es requerido.</p> : <></>}


            <label htmlFor="check">Deshabilitar:</label>
            <input
                id="check"
                type="checkbox"
                name="check"
                onChange={onChangeCheck}
            />

            <input type="submit" value="Enviar" />


            {/* <div className='d-flex'>
                <div>
                    <label htmlFor="venezolano">v</label>
                    <input type="radio" name='nacionalidad' id='venezolano' defaultValue="v" disabled={disabled}
                    {
                        ...register("nacionalidad",{
                            required:{
                                value:true,
                                message:"se requiere la nacionalidad"
                            }
                        })
                    } />
                </div>
                <div>
                    <label htmlFor="extranjero">e</label>
                    <input type="radio" name='nacionalidad' id='extranjero' defaultValue="e" disabled={disabled}
                    {
                        ...register("nacionalidad",{
                            required:{
                                value:true,
                                message:"se requiere la nacionalidad"
                            }
                        })
                    } />
                </div>
                {
                    errors.nacionalidad? <spam>{errors.nacionalidad.message}</spam>:<></>
                }
            </div> */}
            <select name="ds" id="ds"
                {
                ...register("ejemplo",{
                    required:{
                        value:true,
                        message:"select necesario"
                    }
                })
                }>
                <option ></option>
                <option value="q">q</option>
                <option value="w">w</option>
            </select>
            {(errors.ejemplo) ? <p>select requerido.</p> : <></>}

            <label htmlFor="red-only">red-only</label>
            <input type="text"  id='red-only' name='red-only' readOnly value={"jnogfjngwfajibgf"}/>
        </form>
    );
}

export default Prueba