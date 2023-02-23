window.onpageshow = async () => {

    document.getElementById('form-registro').addEventListener('submit', (event) => {
        event.preventDefault()
        crearRegistro()
    })

    document.getElementById('form-acto').addEventListener('submit', (event) => {
        event.preventDefault()
        crearActo()
    })

    obtenerRegistros()
}


const crearRegistro = async () => {
    const nombre = document.getElementById('nuevo-registro').value

    const resultado = await fetch('/api/v1/registros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre
        })

    })

    const datos = await resultado.json()

    if (resultado.status === 201) {

        document.getElementById('nuevo-registro').value = ''
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        obtenerRegistros()
    } else {

        document.getElementById('nuevo-registro').style.borderColor = 'red'
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }

    document.getElementById('cerrar-1').addEventListener('click', () => {
        document.getElementById('dialogo-1').close()
    })
}

const crearActo = async () => {

    const nombre = document.getElementById('nuevo-acto').value
    const registro = document.getElementById('registros').value
    const tributosHonorarios = document.getElementById('tributos-honorarios').value

    const resultado = await fetch('/api/v1/actos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            registro: registro,
            tributosHonorarios: tributosHonorarios
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 201) {

        document.getElementById('nuevo-acto').value = ''
        document.getElementById('mensaje-2').innerHTML = datos.mensaje
        document.getElementById('dialogo-2').showModal()
        obtenerRegistros()
    } else {

        document.getElementById('nuevo-acto').style.borderColor = 'red'
        document.getElementById('mensaje-2').innerHTML = datos.mensaje
        document.getElementById('dialogo-2').showModal()
    }

    document.getElementById('cerrar-2').addEventListener('click', () => {
        document.getElementById('dialogo-2').close()
    })

}

const obtenerRegistros = async () => {

    const resultado = await fetch('/api/v1/registros')

    const datos = await resultado.json()

    if (resultado.status === 200) {

        let listaRegistros = ''

        datos.mensaje.forEach(registro => {
            listaRegistros +=
                `
            <option value="${registro.id}">${registro.nombre}</option>
            `
        })

        document.getElementById('registros').innerHTML = listaRegistros
    }
    else {
        document.getElementById('mensaje-2').innerHTML = datos.mensaje
        document.getElementById('dialogo-2').showModal()
    }
}