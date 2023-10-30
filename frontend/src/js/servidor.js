import axios from 'axios'

const API=axios.create({
    baseURL:"http://127.0.0.1:8000/API/",
})

export const inscripciones=(data)=>{
    return API.post("/inscripciones/", data)
}

export const generos=()=>{
    return API.get("/generos/")
}

export const parentescos=()=>{
    return API.get("/parentescos/")
}
export const registerRepresentantes=(data)=>{
    return API.post("/representantes/", data)
}

export const login=(data)=>{
    return API.post("/login/", data)
}
export const buscarRepresentantes=(identificador)=>{
    return API.get(`/representantes/${identificador}/`)
}

export const año_escolarizacion=()=>{
    return API.get(`/años_escolarizacion/`)
}

export const añoInscripcion=(e)=>{
    return API.get(`/año_inscripcion/${e}/`)
}