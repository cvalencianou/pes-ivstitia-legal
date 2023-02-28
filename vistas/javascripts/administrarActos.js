window.onpageshow = async () => {

    await obtenerRegistros()
    obtenerActosPorIdRegistro()

    document.getElementById('registros-tabla').addEventListener('change', () => {
        obtenerActosPorIdRegistro()
    })

    document.getElementById('cerrar-1').addEventListener('click', () => {
        document.getElementById('dialogo-1').close()
    })

    document.getElementById('cerrar-4').addEventListener('click', () => {
        document.getElementById('dialogo-4').close()
    })

    document.getElementById('tabla-actos').addEventListener('click', (event) => {

        if (event.target.type !== 'submit') {
            return
        }

        if (event.target.innerHTML === 'Actualizar') {
            abrirActualizarActo(event.target.value)
        }
        else if (event.target.innerHTML === 'Eliminar') {

            document.getElementById('dialogo-2').showModal()

            document.getElementById('eliminar-2').addEventListener('click', () => {
                eliminarActo(event.target.value)
            })

            document.getElementById('cancelar-2').addEventListener('click', () => {
                document.getElementById('dialogo-2').close()
            })
        }
    })

    document.getElementById('seccion-modificar-acto').style.display = 'none'

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

        document.getElementById('registros-tabla').innerHTML = listaRegistros
    }
    else {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}

const obtenerActosPorIdRegistro = async () => {

    const resultado = await fetch(`/api/v1/actos/registro/${document.getElementById('registros-tabla').value}`)

    const datos = await resultado.json()

    if (resultado.status === 200) {

        let listaActos = ''

        datos.mensaje.forEach(acto => {
            listaActos +=
                `
                <tr id="${acto.id}">
                    <td class="id-usuario">${acto.id}</td>
                    <td class="correo-usuario">${acto.nombre}</td>
               
                    <td>
                        <button value="${acto.id}">Actualizar</button>
                        <button value="${acto.id}">Eliminar</button>
                    </td>
                </tr>
          `
        })

        document.getElementById('tabla-actos').innerHTML = listaActos
    }
    else {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}

const eliminarActo = async (id) => {

    document.getElementById('dialogo-2').close()

    const resultado = await fetch(`/api/v1/actos/${id}`, {
        method: 'DELETE'
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        document.getElementById('mensaje-3').innerHTML = datos.mensaje
        document.getElementById('dialogo-3').showModal()
        document.getElementById('cerrar-3').addEventListener('click', () => {
            document.getElementById('dialogo-3').close()
            obtenerActosPorIdRegistro()
        })
    } else {
        document.getElementById('mensaje-3').innerHTML = datos.mensaje
        document.getElementById('dialogo-3').showModal()
    }
}

const abrirActualizarActo = async (id) => {
    document.getElementById('seccion-actos').style.display = 'none'
    document.getElementById('seccion-modificar-acto').style.display = 'block'
    obtenerActoPorId(id)

    document.getElementById('form-modificar-acto').addEventListener('submit', (event) => {
        event.preventDefault()
        actualizarActo(id)
    })
}

const actualizarActo = async (id) => {
    const nombre = document.getElementById('nombre-acto').value
    const tributosHonorarios = document.getElementById('tributos-acto').value

    console.log(id + '' + nombre + ' ' + tributosHonorarios)

    try {
        JSON.parse(tributosHonorarios)
    } catch (error) {
        alert('ERROR FORMATO JSON')
        return
    }

    const resultado = await fetch(`/api/v1/actos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            tributosHonorarios: tributosHonorarios
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        alert('ACTUALIZADOOO')
    } else {

    }
}

const obtenerActoPorId = async (id) => {
    const resultado = await fetch(`/api/v1/actos/${id}`)

    const datos = (await resultado.json()).mensaje[0]

    if (resultado.status === 200) {
        document.getElementById('nombre-acto').value = datos.nombre
        document.getElementById('tributos-acto').value = JSON.stringify(datos['tributos_general'])
    }
    else {
        document.getElementById('mensaje-4').innerHTML = datos.mensaje
        document.getElementById('dialogo-4').showModal()
    }
}