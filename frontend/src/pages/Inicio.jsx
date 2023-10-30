import {React, useContext} from 'react'
import Navbvar from '../components/universal/Navbar.jsx'
import { AuthContext } from '../context/AuthContext';

function Inicio() {
    const { user } = useContext(AuthContext)
    return (
        <>
            <header>
                <Navbvar />
            </header>
            <main className='w-100 bg-light flex-grow-1 d-flex'>
                <span className='ms-auto mt-1 me-2 fw-bold'>{`Bienvenido, ${user.nombre}`}</span>
            </main>
        </>
    )
}

export default Inicio