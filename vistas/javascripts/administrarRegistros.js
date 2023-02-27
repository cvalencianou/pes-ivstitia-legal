window.onpageshow = async () => {

    document.getElementById('seccion-actualizar-registro').style.display = 'none'

    document.getElementById('tabla-registros').addEventListener('click', (event) => {

        if (event.target.type !== 'submit') {
            return
        }
        if (event.target.innerHTML === 'Actualizar') {
            abrirActualizarRegistro(event.target.value)
        }
        else if (event.target.innerHTML === 'Eliminar') {

            document.getElementById('dialogo-2').showModal()

            document.getElementById('eliminar-2').addEventListener('click', () => {
                eliminarRegistro(event.target.value)
                // document.getElementById('dialogo-2').close()
            })

            document.getElementById('cancelar-2').addEventListener('click', () => {
                document.getElementById('dialogo-2').close()
            })
        }
    })

    obtenerRegistros();
}

const obtenerRegistros = async () => {

    const resultado = await fetch('/api/v1/registros')

    const datos = await resultado.json()

    if (resultado.status === 200) {

        let listaRegistros = ''

        datos.mensaje.forEach(registro => {
            listaRegistros +=
                `
                <tr id="${registro.id}">
                    <td class="tabla-id-registro">${registro.id}</td>
                    <td class="tabla-nombre-registro">${registro.nombre}</td>
                    <td class="tabla-contenedor-botones">
                        <button value="${registro.id}">Actualizar</button>
                        <button value="${registro.id}">Eliminar</button>
                    </td>
                </tr>
                `
        })

        document.getElementById('tabla-registros').innerHTML = listaRegistros
    } else {

        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        document.getElementById('cerrar-1').addEventListener('click', () => {
            document.getElementById('dialogo-1').close()
        })
    }
}

const abrirActualizarRegistro = async (id) => {
    document.getElementById('seccion-tabla-registros').style.display = 'none'
    document.getElementById('seccion-actualizar-registro').style.display = 'block'

    document.getElementById('nuevo-nombre-registro').value = document.getElementById(id).children.item(1).innerHTML

    document.getElementById('form-actualizar-registro').addEventListener('submit', (event) => {
        event.preventDefault()
        actualizarRegistro(id)
    })
}

const actualizarRegistro = async (id) => {

    const nombre = document.getElementById('nuevo-nombre-registro').value

    const resultado = await fetch(`/api/v1/registros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        document.getElementById('mensaje-3').innerHTML = datos.mensaje
        document.getElementById('dialogo-3').showModal()
    } else {
        document.getElementById('mensaje-3').innerHTML = datos.mensaje
        document.getElementById('dialogo-3').showModal()
    }

    document.getElementById('cerrar-3').addEventListener('click', () => {
        document.getElementById('dialogo-3').close()
        window.location.replace('actualizar-registros')
    })
}

const eliminarRegistro = async (id) => {

    document.getElementById('dialogo-2').close()

    const resultado = await fetch(`/api/v1/registros/${id}`, {
        method: 'DELETE'
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        document.getElementById('cerrar-1').addEventListener('click', () => {
            document.getElementById('dialogo-1').close()
            return obtenerRegistros()
        })
    } else {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}