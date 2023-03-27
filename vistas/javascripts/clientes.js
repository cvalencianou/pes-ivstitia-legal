window.onpageshow = async () => {

    document.getElementById('seccion-actualizar-cliente').style.display = 'none'

    document.getElementById('buscarCliente').addEventListener('submit', (event) => {
        event.preventDefault()
        filtrarClientes()
    })

    document.getElementById('cerrar-1').addEventListener('click', () => {
        document.getElementById('dialogo-1').close()
    })

    document.getElementById('lista-clientes').addEventListener('click', (event) => {

        if (event.target.type !== 'submit') {
            return
        }

        if (event.target.innerHTML === 'Actualizar') {
            cargarActualizarCliente(event.target.value)
        }

        else if (event.target.innerHTML === 'Eliminar') {

            document.getElementById('eliminar-cliente').addEventListener('click', () => {
                eliminarCliente(event.target.value)
                document.getElementById('dialogo-eliminar-cliente').close()
                window.location.assign('clientes')
            })

            document.getElementById('eliminar-cancelar-cliente').addEventListener('click', () => {
                window.location.assign('clientes')
            })

            document.getElementById('dialogo-eliminar-cliente').showModal()
        }
    })

    obtenerClientes()

}

const obtenerClientes = async () => {

    const resultado = await fetch('/api/v1/clientes')

    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            let listaClientes = ''

            data.mensaje.forEach(cliente => {
                listaClientes +=
                    `
                <li id="informacion-clientes">
                Nombre: ${cliente.nombre}  Cedula: ${cliente.cedula}  <br><br>
                Teléfono movil: ${cliente.telefono_movil} Teléfono físico: ${cliente.telefono_fisico} <br><br>
                Correo: ${cliente.correo}    Dirección: ${cliente.direccion} <br><br>
                <button value="${cliente.id}">Actualizar</button>
                <button value="${cliente.id}">Eliminar</button>
                </li>
                `
            });



            document.getElementById('lista-clientes').innerHTML = listaClientes

            break;

        default:
            document.getElementById('mensaje1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
    }
}

const filtrarClientes = async () => {
    const datoCliente = document.getElementById('datoCliente').value

    const resultado = await fetch(`/api/v1/clientes/filtro?datoCliente=${datoCliente}`)

    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            let listaClientes = ''

            data.mensaje.forEach(cliente => {
                listaClientes +=
                    `
                <li>
                Nombre: ${cliente.nombre}  Cedula: ${cliente.cedula}  <br><br>
                Teléfono movil: ${cliente.telefonoMovil} Teléfono físico: ${cliente.telefonoFisico} <br><br>
                Correo: ${cliente.correo}    Dirección: ${cliente.direccion} 
                <a href="actualizar-cliente" id="btnActualizar"><button value="${cliente.id}">Actualizar</button>
                <button value="${cliente.id}">Eliminar</button>
                </li>
                `
            });

            document.getElementById('lista-clientes').innerHTML = listaClientes

            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}

const cargarActualizarCliente = async (clienteId) => {

    document.getElementById('main-clientes').style.display = 'none'
    document.getElementById('seccion-actualizar-cliente').style.display = 'block'
    await obtenerCliente(clienteId)

    document.getElementById('form-actualizar-cliente').addEventListener('submit', (event) => {
        event.preventDefault()
        actualizarCliente(clienteId)
    })
}

const obtenerCliente = async (clienteId) => {

    const resultado = await fetch(`/api/v1/clientes/${clienteId}`)

    const data = ((await resultado.json()).mensaje)[0]

    //fetch de opciones



    switch (resultado.status) {
        case 200:
            document.getElementById('nombre').value = data.nombre
            document.getElementById('tipo-cedula').value = data.tipo_cedula_id
            document.getElementById('cedula').value = data.cedula
            document.getElementById('correo').value = data.correo
            document.getElementById('telefonoMovil').value = data.telefono_movil
            document.getElementById('telefonoFisico').value = data.telefono_fisico
            document.getElementById('direccion').value = data.direccion
            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}

const actualizarCliente = async (clienteId) => {
    
    const nombreCliente = document.getElementById('nombre').value
    const tipoCedula = document.getElementById('tipo-cedula').value
    const cedula = document.getElementById('cedula').value
    const correo = document.getElementById('correo').value
    const telefonoFisico = document.getElementById('telefonoFisico').value
    const telefonoMovil = document.getElementById('telefonoMovil').value
    const direccion = document.getElementById('direccion').value

    const resultado = await fetch(`/api/v1/clientes/${clienteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombreCliente,
            cedula: cedula,
            correo: correo,
            telefonoFisico: telefonoFisico,
            telefonoMovil: telefonoMovil,
            direccion: direccion,
            tipoCedula: tipoCedula
        })
    })

    const datos = await resultado.json()

    switch (resultado.status) {
        case 200:
            document.getElementById('mensaje-1').innerHTML = datos.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                window.location.assign('clientes')
            })
            console.log(resultado.status)
            break;

        default:
            document.getElementById('mensaje-1').innerHTML = datos.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                document.getElementById('dialogo-1').close()
            })
            break;
    }
}

const eliminarCliente = async (clienteId) => {

    const resultado = await fetch(`/api/v1/clientes/${clienteId}`, {
        method: 'DELETE'
    })

    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            obtenerClientes()
            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}
