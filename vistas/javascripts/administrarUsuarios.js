window.onpageshow = async () => {

    document.getElementById('seccion-actualizar-usuario').style.display = 'none'

    document.getElementById('form-nuevo-usuario').addEventListener('submit', (event) => {
        event.preventDefault()
        registrarUsuario()
    })

    document.getElementById('cerrar-1').addEventListener('click', () => {
        document.getElementById('dialogo-1').close()
    })

    document.getElementById('tabla-usuarios').addEventListener('click', (event) => {

        if (event.target.type !== 'submit') {
            return
        }
        if (event.target.innerHTML === 'Actualizar') {
            abrirActualizarUsuario(event.target.value)
        }
        else if (event.target.innerHTML === 'Eliminar') {

            document.getElementById('eliminar-tabla-usuarios').addEventListener('click', () => {
                eliminarUsuario(event.target.value)
                document.getElementById('dialogo-eliminar-tabla-usuarios').close()
            })

            document.getElementById('eliminar-cancelar-tabla-usuarios').addEventListener('click', () => {
                document.getElementById('dialogo-eliminar-tabla-usuarios').close()
            })

            document.getElementById('dialogo-eliminar-tabla-usuarios').showModal()
        }
    })

    obtenerUsuarios()
}

const registrarUsuario = async () => {

    const correo = document.getElementById('nuevo-correo').value

    const resultado = await fetch('/api/v1/usuarios', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 201) {

        document.getElementById('nuevo-correo').value = ''
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        obtenerUsuarios()
    } else {

        document.getElementById('nuevo-correo').style.borderColor = 'red'
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}

const obtenerUsuarios = async () => {

    const resultado = await fetch('/api/v1/usuarios')

    const datos = await resultado.json()

    if (resultado.status === 200) {

        let listaUsuarios = ''

        datos.mensaje.forEach(usuario => {
            listaUsuarios +=
                `
                <tr id="${usuario.id}">
                    <td class="id-usuario">${usuario.id}</td>
                    <td class="correo-usuario">${usuario.correo}</td>
                    </td>                    
                    <td class="tareas-usuario">
                        <button value="${usuario.id}">Actualizar</button>
                        <button value="${usuario.id}">Eliminar</button>
                    </td>
                    <td style="display:none">
                    <select name="select-administrador" id="select-administrador">
                    <option value="0" ${usuario.administrador === 0 ? 'selected' : ''}>No</option>
                    <option value="1" ${usuario.administrador === 1 ? 'selected' : ''}>Sí</option>                    
                    </select>
                    </td>
                </tr>
                `
        })

        document.getElementById('tabla-usuarios').innerHTML = listaUsuarios
    } else {

        document.getElementById('mensaje1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}

const abrirActualizarUsuario = async (id) => {

    document.getElementById('main-administrar-usuarios').style.display = 'none'
    document.getElementById('seccion-actualizar-usuario').style.display = 'block'

    document.getElementById('correo').value = document.getElementById(id).children.item(1).innerHTML
    document.getElementById('rol').innerHTML = document.getElementById(id).children.item(3).children.item(0).innerHTML

    document.getElementById('form-actualizar-usuario').addEventListener('submit', (event) => {
        event.preventDefault()
        actualizarUsuario(id)
    })
}

const actualizarUsuario = async (id) => {


    const correo = document.getElementById('correo').value
    const administrador = document.getElementById('rol').value

    const resultado = await fetch(`/api/v1/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo,
            administrador: administrador
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        document.getElementById('cerrar-1').addEventListener('click', () => {
            window.location.assign('administrar-usuarios')
        })

    } else {
        document.getElementById('correo').style.borderColor = 'red'
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        document.getElementById('cerrar-1').addEventListener('click', () => {
            document.getElementById('dialogo-1').close()
        })
    }
}

const eliminarUsuario = async (id) => {

    const resultado = await fetch(`/api/v1/usuarios/${id}`, {
        method: 'DELETE'
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        obtenerUsuarios()
    } else {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}