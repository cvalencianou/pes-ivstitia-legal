window.onpageshow = async () => {

    document.getElementById('form-nuevo-usuario').addEventListener('submit', (event) => {
        event.preventDefault()
        registrarUsuario()
    })

    document.getElementById('cerrar-dialogo-nuevo-usuario').addEventListener('click', () => {
        document.getElementById('dialogo-nuevo-usuario').close()
    })

    document.getElementById('cerrar-tabla-usuarios').addEventListener('click', () => {
        document.getElementById('dialogo-tabla-usuarios').close()
    })

    document.getElementById('tabla-usuarios').addEventListener('click', (event) => {

        if (event.target.type !== 'submit') {
            return
        }
        if (event.target.innerHTML === 'Actualizar') {
            actualizarUsuario(event.target.value)
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

    const status = resultado.status
    const data = await resultado.json()

    switch (status) {
        case 201:
            document.getElementById('nuevo-correo').value = ''
            document.getElementById('mensaje-dialogo-nuevo-usuario').innerHTML = data.mensaje
            document.getElementById('dialogo-nuevo-usuario').showModal()
            obtenerUsuarios()
            break;

        default:
            document.getElementById('nuevo-correo').style.borderColor = 'red'
            document.getElementById('mensaje-dialogo-nuevo-usuario').innerHTML = data.mensaje
            document.getElementById('dialogo-nuevo-usuario').showModal()
            break;
    }
}

const obtenerUsuarios = async () => {

    const resultado = await fetch('/api/v1/usuarios')

    const status = resultado.status
    const data = await resultado.json()


    switch (status) {
        case 200:
            let datosTabla = ''
            data.mensaje.forEach(usuario => {
                datosTabla +=
                    `
                <tr id="${usuario.id}">
                    <td class="id-usuario">${usuario.id}</td>
                    <td class="correo-usuario" contenteditable="true">${usuario.correo}</td>
                    </td>
                    <td>
                        <select name="select-administrador" id="select-administrador">
                        <option value="1" ${usuario.administrador === 1 ? 'selected' : ''}>Sí</option>
                        <option value="0" ${usuario.administrador === 0 ? 'selected' : ''}>No</option>
                        </select>
                    </td>
                    <td>
                        <button value="${usuario.id}">Actualizar</button>
                        <button value="${usuario.id}">Eliminar</button>
                    </td>
                </tr>
                `
            })

            document.getElementById('tabla-usuarios').innerHTML = datosTabla
            break;

        default:
            break;
    }
}

const actualizarUsuario = async (id) => {

    const fila = document.getElementById(id)
    const correo = fila.children.item(1).innerHTML
    const administrador = fila.children.item(2).children.item(0).value

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

    const status = resultado.status
    const data = await resultado.json()

    switch (status) {
        case 200:
            document.getElementById('mensaje-dialogo-tabla-usuarios').innerHTML = data.mensaje
            document.getElementById('dialogo-tabla-usuarios').showModal()
            obtenerUsuarios()
            break;

        default:
            document.getElementById('mensaje-dialogo-tabla-usuarios').innerHTML = data.mensaje
            document.getElementById('dialogo-tabla-usuarios').showModal()
            obtenerUsuarios()
            break;
    }
}

const eliminarUsuario = async (id) => {

    const resultado = await fetch(`/api/v1/usuarios/${id}`, {
        method: 'DELETE'
    })

    const status = resultado.status
    const data = await resultado.json()

    switch (status) {
        case 200:
            document.getElementById('mensaje-dialogo-tabla-usuarios').innerHTML = data.mensaje
            document.getElementById('dialogo-tabla-usuarios').showModal()
            obtenerUsuarios()
            break;

        default:
            document.getElementById('mensaje-dialogo-tabla-usuarios').innerHTML = data.mensaje
            document.getElementById('dialogo-tabla-usuarios').showModal()
            break;
    }
}