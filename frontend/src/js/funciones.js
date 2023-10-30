export const calcular_edad = (fecha_nacimiento, fecha) => {
    const fechaNacimiento = new Date(fecha_nacimiento)
    const añoActual = Number(fecha.getFullYear())
    const mesActual = Number(fecha.getMonth() + 1)
    const diaActual = Number(fecha.getDate())

    const añoNacimiento = Number(fechaNacimiento.getFullYear())
    const mesNacimiento = Number(fechaNacimiento.getMonth() + 1)
    const diaNacimiento = Number(fechaNacimiento.getDate() + 1)
    let edad = añoActual - añoNacimiento
    if (mesActual < mesNacimiento) {
        edad = edad - 1
    } else if (mesActual === mesNacimiento) {
        if (diaActual < diaNacimiento) {
            edad = edad - 1
        }
    }
    return edad
}
