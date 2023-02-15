document.getElementById('nuevo').addEventListener('click', () => {
    document.getElementById('crear-usuario').showModal();
})

document.getElementById('cerrar').addEventListener('click', () => {
    document.getElementById('crear-usuario').close()
})

document.getElementById('form-nuevo-usuario').addEventListener('submit', (event) => {
    event.preventDefault()
    registrarUsuario()
})

document.getElementById('cerrar-tabla').addEventListener('click', () => {
    document.getElementById('dialogo').close()
})

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
            document.getElementById('crear-usuario').innerHTML = data.mensaje +
                `<button id="cerrar" type="button">Cerrar</button>`
            document.getElementById('cerrar').addEventListener('click', () => {
                document.getElementById('crear-usuario').close()
            })
            break;

        default:
            document.getElementById('crear-usuario').innerHTML = data.mensaje +
                `<button id="cerrar" type="button">Cerrar</button>`
            document.getElementById('cerrar').addEventListener('click', () => {
                document.getElementById('crear-usuario').close()
            })
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
                    <td>${usuario.id}</td>
                    <td contenteditable="true">${usuario.correo}</td>
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

obtenerUsuarios()

document.getElementById('tabla-usuarios').addEventListener('click', (event) => {

    if (event.target.type !== 'submit') {
        return
    }
    if (event.target.innerHTML === 'Actualizar') {
        actualizarUsuario(event.target.value)
    }
    else if (event.target.innerHTML === 'Eliminar') {
        eliminarUsuario(event.target.value)
    }
})

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
            document.getElementById('mensaje').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
            break;

        default:
            document.getElementById('mensaje').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
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
            document.getElementById('mensaje').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
            obtenerUsuarios()
            break;

        default:
            document.getElementById('mensaje').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
            break;
    }
}