import { React, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { setLoginUser, user } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        const listmenu = document.querySelectorAll(".sub-menu")
        const content = document.getElementById("content-menu")
        const menu = document.getElementById("menu")
        listmenu.forEach(element => {
            element.addEventListener(`click`, () => {
                let submenu = element.children[1].children[0]
                let height = 0
                if (window.innerWidth < 576) {
                    if (submenu.clientHeight === 0) {
                        height = submenu.scrollHeight
                    }
                    submenu.style.height = `${height}px`
                }
            })
        })
        window.addEventListener(`resize`, () => {
            if (window.innerWidth > 574) {
                content.classList.remove("content-menu-show")
                menu.classList.remove("menu-show")

                listmenu.forEach(element => {
                    let submenu = element.children[1].children[0]
                    let height = 0
                    height = submenu.scrollHeight
                    submenu.style.height = `${height}px`
                })
            } else {
                if (!menu.classList.contains("menu-show")) {
                    listmenu.forEach(element => {
                        let submenu = element.children[1].children[0]
                        let height = 0
                        submenu.style.height = `${height}px`
                    })
                }
            }

        })
    }, [])
    // funcion para agregar el menu al dar clikc en el button
    const show_menu = () => {
        const content = document.getElementById("content-menu")
        const menu = document.getElementById("menu")
        content.classList.toggle("content-menu-show")
        menu.classList.toggle("menu-show")
    }
    // funcion para quitar el menu al dar clikc fuera de el
    const removemenu = (e) => {
        const content = document.getElementById("content-menu")
        const menu = document.getElementById("menu")
        if (e.target.id === "content-menu" && window.innerWidth < 576) {
            content.classList.remove("content-menu-show")
            menu.classList.remove("menu-show")
        }
    }
    // funcion para cerrar el sesion
    const cerrarSecion = () => {
        setLoginUser({
            ...user,
            state: false,
            token: null,
            nombre: null,
            usuario: null,
            cargo: null,
        })
        navigate("/")
    }
    return (
        <nav className=' nav-bar'>
            <div className="container-fluid">
                <Link to={"/inicio/"} className='logo'>SGCPA</Link>
                <button onClick={() => { show_menu() }} type='buttom' className='menu-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" ><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                </button>
                <div onClick={(e) => { removemenu(e) }} className='content-menu' id='content-menu' >
                    <ul className='nav-list' id='menu'>
                        <li className='nav-item sub-menu' >
                            <p className='nav_link' >
                                <span className='nav-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.715 12c1.151 0 2-.849 2-2s-.849-2-2-2-2 .849-2 2 .848 2 2 2z"></path><path d="M20 4H4c-1.103 0-2 .841-2 1.875v12.25C2 19.159 2.897 20 4 20h16c1.103 0 2-.841 2-1.875V5.875C22 4.841 21.103 4 20 4zm0 14-16-.011V6l16 .011V18z"></path><path d="M14 9h4v2h-4zm1 4h3v2h-3zm-1.57 2.536c0-1.374-1.676-2.786-3.715-2.786S6 14.162 6 15.536V16h7.43v-.464z"></path></svg>
                                </span>
                                <span className='link-text'>
                                    Estudiantes
                                </span>
                                <span className='arrow'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" ><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                                </span>
                            </p>
                            <div className="content-shadow">
                                <ul className='item-list'>
                                    <li className='nav-item-list'>
                                        <Link className='nav_link'>Estudiantes</Link>
                                    </li>
                                    <li className='nav-link-list'>
                                        <Link className='nav_link' to={"/registrar_representantes"}>Registro de Representante</Link>
                                    </li>
                                    <li className='nav-link-list'>
                                        <Link className='nav_link' to={"/nuevo_ingreso"} >Nuevo Ingreso</Link>
                                    </li>

                                    <li className='nav-link-list'>
                                        <Link className='nav_link'>Reinscripciones</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='nav-item'>
                            <Link to="#sd" className='nav_link'>
                                <span className='nav-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M5.282 12.064c-.428.328-.72.609-.875.851-.155.24-.249.498-.279.768h2.679v-.748H5.413c.081-.081.152-.151.212-.201.062-.05.182-.142.361-.27.303-.218.511-.42.626-.604.116-.186.173-.375.173-.578a.898.898 0 0 0-.151-.512.892.892 0 0 0-.412-.341c-.174-.076-.419-.111-.733-.111-.3 0-.537.038-.706.114a.889.889 0 0 0-.396.338c-.094.143-.159.346-.194.604l.894.076c.025-.188.074-.317.147-.394a.375.375 0 0 1 .279-.108c.11 0 .2.035.272.108a.344.344 0 0 1 .108.258.55.55 0 0 1-.108.297c-.074.102-.241.254-.503.453zm.055 6.386a.398.398 0 0 1-.282-.105c-.074-.07-.128-.195-.162-.378L4 18.085c.059.204.142.372.251.506.109.133.248.235.417.306.168.069.399.103.692.103.3 0 .541-.047.725-.14a1 1 0 0 0 .424-.403c.098-.175.146-.354.146-.544a.823.823 0 0 0-.088-.393.708.708 0 0 0-.249-.261 1.015 1.015 0 0 0-.286-.11.943.943 0 0 0 .345-.299.673.673 0 0 0 .113-.383.747.747 0 0 0-.281-.596c-.187-.159-.49-.238-.909-.238-.365 0-.648.072-.847.219-.2.143-.334.353-.404.626l.844.151c.023-.162.067-.274.133-.338s.151-.098.257-.098a.33.33 0 0 1 .241.089c.059.06.087.139.087.238 0 .104-.038.193-.117.27s-.177.112-.293.112a.907.907 0 0 1-.116-.011l-.045.649a1.13 1.13 0 0 1 .289-.056c.132 0 .237.041.313.126.077.082.115.199.115.352 0 .146-.04.266-.119.354a.394.394 0 0 1-.301.134zm.948-10.083V5h-.739a1.47 1.47 0 0 1-.394.523c-.168.142-.404.262-.708.365v.754a2.595 2.595 0 0 0 .937-.48v2.206h.904zM9 6h11v2H9zm0 5h11v2H9zm0 5h11v2H9z"></path></svg>
                                </span>
                                <span className='link-text'>
                                    Notas
                                </span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav_link'>
                                <span className='nav-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
                                </span>
                                <span className='link-text'>
                                    Asistencias
                                </span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav_link'>
                                <span className='nav-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15zM5 5h2v2h10V5h2v15H5V5z"></path><path d="M14.292 10.295 12 12.587l-2.292-2.292-1.414 1.414 2.292 2.292-2.292 2.292 1.414 1.414L12 15.415l2.292 2.292 1.414-1.414-2.292-2.292 2.292-2.292z"></path></svg>
                                </span>
                                <span className='link-text'>
                                    Insidencias
                                </span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav_link'>
                                <span className='nav-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path></svg>
                                </span>
                                <span className='link-text'>
                                    Control Academico
                                </span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav_link'>
                                <span className='nav-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3H3z"></path><path d="M15.293 14.707a.999.999 0 0 0 1.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a.999.999 0 0 0-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z"></path></svg>
                                </span>
                                <span className='link-text'>
                                    Estadistico
                                </span>
                            </Link>
                        </li>
                        <li className='nav-item ms-auto'>
                            <button className='nav_link' onClick={cerrarSecion}>
                                <span className='nav-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M5.002 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-14c-1.103 0-2 .897-2 2v6.001H10V7l6 5-6 5v-3.999H3.002V19c0 1.103.897 2 2 2z"></path></svg>                                </span>
                                <span className='link-text'>
                                    Cerrar Sesión
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar