window.onpageshow = async () => {

    let casoId = sessionStorage.getItem("casoId")

    document.getElementById('seccion-agregar-cliente').style.display = 'none'
    document.getElementById('seccion-agregar-nota').style.display = 'none'
    document.getElementById('seccion-actualizar-caso').style.display = 'none'

    document.getElementById('cerrar-1').addEventListener('click', () => {
        document.getElementById('dialogo-1').close()
    })


    document.getElementById('opciones-caso').addEventListener('click', (event) => {
        if (event.target.type !== 'submit') {
            return
        }

        if (event.target.innerHTML === 'Actualizar') {
            cargarActualizarCaso(event.target.value)
        }

        if (event.target.innerHTML === 'Agregar nota') {
            cargarAgregarNota(event.target.value)
        }

        if (event.target.innerHTML === 'Agregar cliente') {
            cargarAgregarCliente(event.target.value)
        }
        if (event.target.innerHTML === 'Volver') {
            window.location.assign('casos')
        }

        else if (event.target.innerHTML === 'Eliminar') {

            document.getElementById('eliminar-caso').addEventListener('click', () => {
                eliminarCaso(event.target.value)
                document.getElementById('dialogo-eliminar-caso').close()
                window.location.assign('casos')
            })

            document.getElementById('eliminar-cancelar-caso').addEventListener('click', () => {
                document.getElementById('dialogo-eliminar-caso').close()
            })

            document.getElementById('dialogo-eliminar-caso').showModal()
        }
    })

    document.getElementById('tabla-notas-caso').addEventListener('click', (event) => {

        if (event.target.type !== 'submit') {
            return
        }
        if (event.target.innerHTML === 'Eliminar') {

            document.getElementById('eliminar-notas').addEventListener('click', () => {
                eliminarNota(event.target.value, casoId)
                document.getElementById('dialogo-eliminar-notas').close()
                window.location.assign('visualizar-caso')
            })

            document.getElementById('eliminar-cancelar-notas').addEventListener('click', () => {
                document.getElementById('dialogo-eliminar-notas').close()
            })

            document.getElementById('dialogo-eliminar-notas').showModal()
        }
    })

    document.getElementById('tabla-clientes-caso').addEventListener('click', (event) => {

        if (event.target.type !== 'submit') {
            return
        }

        if (event.target.innerHTML === 'Eliminar') {
            document.getElementById('eliminar-clientes').addEventListener('click', () => {
                eliminarCliente(event.target.value, casoId)
                document.getElementById('dialogo-eliminar-clientes').close()
                window.location.assign('visualizar-caso')
            })

            document.getElementById('eliminar-cancelar-clientes').addEventListener('click', () => {
                document.getElementById('dialogo-eliminar-clientes').close()
            })

            document.getElementById('dialogo-eliminar-clientes').showModal()
        }
    })

    cargarDatosCaso(casoId)
    obtenerNotasCaso(casoId)
    obtenerClientesCaso(casoId)
    cargarOpciones(casoId)

}

const cargarOpciones = async (casoId) => {
    const opciones =
        `
            <button class="botones-opcion" value="${casoId}">Actualizar</button>
            <button class="botones-opcion" value="${casoId}">Agregar nota</button>
            <button class="botones-opcion" value="${casoId}">Agregar cliente</button>
            <button class="botones-opcion" value="${casoId}">Eliminar</button>
            <button class="botones-opcion" value="${casoId}">Volver</button> <br><br> 
        `

    document.getElementById('opciones-caso').innerHTML = opciones
}

const cargarDatosCaso = async (casoId) => {

    const resultado = await fetch(`/api/v1/casos/${casoId}`)
    const dataCaso = ((await resultado.json()).mensaje)[0]

    switch (resultado.status) {
        case 200:

            document.getElementById('nombre-caso').innerHTML = dataCaso.nombre
            document.getElementById('despacho').innerHTML = dataCaso.despacho
            document.getElementById('tipo-proceso').innerHTML = dataCaso.tipo_proceso
            document.getElementById('descripcion').innerHTML = dataCaso.descripcion
            document.getElementById('estado').innerHTML = dataCaso.estado
            break;

        default:

            document.getElementById('mensaje1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}

const obtenerNotasCaso = async (casoId) => {

    const resultado = await fetch(`/api/v1/casos/${casoId}`)
    const dataNota = (await resultado.json()).notas

    switch (resultado.status) {
        case 200:

            let listaNotas = ''

            dataNota.forEach(nota => {
                listaNotas +=
                    `
                <tr id="${nota.id}">
                    <td class="nota-caso">${nota.nota}</td>
                    <td class="opcion-nota" id="opcion-nota">
                        <button class="boton-tabla" value="${nota.id}">Eliminar</button>
                    </td>
                </tr>
                `
            });

            document.getElementById('tabla-notas').innerHTML = listaNotas

            break;

        default:

            document.getElementById('mensaje1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}

const obtenerClientesCaso = async (casoId) => {

    const resultado = await fetch(`/api/v1/casos/${casoId}`)
    const dataCliente = ((await resultado.json()).clientes)

    switch (resultado.status) {
        case 200:

            let listaClientes = ''

            dataCliente.forEach(cliente => {
                listaClientes +=
                    `
        <tr id="${cliente.cliente_id}">
            <td class="cliente-caso">${cliente.nombre}</td>
            <td class="opcion-nota">
                <button class="boton-tabla" value="${cliente.cliente_id}">Eliminar</button>
            </td>
        </tr>
        `
            });

            document.getElementById('tabla-clientes').innerHTML = listaClientes

            break;

        default:
            break;
    }
}

const cargarActualizarCaso = async (casoId) => {

    document.getElementById('main-visualizar-caso').style.display = 'none'
    document.getElementById('seccion-agregar-cliente').style.display = 'none'
    document.getElementById('seccion-agregar-nota').style.display = 'none'
    document.getElementById('seccion-actualizar-caso').style.display = 'block'

    await obtenerCaso(casoId)

    document.getElementById('form-actualizar-caso').addEventListener('submit', (event) => {
        event.preventDefault()
        actualizarCaso(casoId)
    })

}

const obtenerCaso = async (casoId) => {

    const resultado = await fetch(`/api/v1/casos/${casoId}`)
    const data = ((await resultado.json()).mensaje)[0]

    switch (resultado.status) {
        case 200:
            document.getElementById('nombre-caso-actualizar').value = data.nombre
            document.getElementById('despacho-actualizar').value = data.despacho
            document.getElementById('tipo-proceso-actualizar').value = data.tipo_proceso_id
            document.getElementById('descripcion-actualizar').value = data.descripcion
            document.getElementById('estado-actualizar').value = data.estado_id
            break;

        default:

            document.getElementById('mensaje1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}

const actualizarCaso = async (casoId) => {

    const nombre = document.getElementById('nombre-caso-actualizar').value
    const despacho = document.getElementById('despacho-actualizar').value
    const descripcion = document.getElementById('descripcion-actualizar').value
    const tipoProceso = document.getElementById('tipo-proceso-actualizar').value
    const estado = document.getElementById('estado-actualizar').value

    const resultado = await fetch(`/api/v1/casos/${casoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            despacho: despacho,
            descripcion: descripcion,
            tipoProceso: tipoProceso,
            estado: estado
        })
    })

    const dataCaso = await resultado.json()

    switch (resultado.status) {
        case 200:
            document.getElementById('mensaje-1').innerHTML = dataCaso.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                window.location.assign('visualizar-caso')
            })

            break;

        default:
            document.getElementById('mensaje-1').innerHTML = dataCaso.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                document.getElementById('dialogo-1').close()
            })
            break;
    }
}

const cargarAgregarNota = async (casoId) => {

    document.getElementById('main-visualizar-caso').style.display = 'none'
    document.getElementById('seccion-agregar-cliente').style.display = 'none'
    document.getElementById('seccion-agregar-nota').style.display = 'block'
    document.getElementById('seccion-actualizar-caso').style.display = 'none'

    document.getElementById('form-agregar-nota').addEventListener('submit', (event) => {
        event.preventDefault()
        agregarNota(casoId)
    })
}

const agregarNota = async (casoId) => {

    const nota = document.getElementById('nota').value
    const resultado = await fetch(`/api/v1/casos/${casoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nota: nota
        })
    })

    const dataNota = await resultado.json()

    switch (resultado.status) {
        case 201:
            document.getElementById('mensaje-1').innerHTML = dataNota.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                window.location.assign('visualizar-caso')
            })

            break;

        default:
            document.getElementById('mensaje-1').innerHTML = dataNota.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                document.getElementById('dialogo-1').close()
            })
            break;
    }

}

const cargarAgregarCliente = async (casoId) => {

    document.getElementById('main-visualizar-caso').style.display = 'none'
    document.getElementById('seccion-agregar-cliente').style.display = 'block'
    document.getElementById('seccion-agregar-nota').style.display = 'none'
    document.getElementById('seccion-actualizar-caso').style.display = 'none'

    cargarClientes(casoId)

    document.getElementById('form-agregar-cliente').addEventListener('submit', (event) => {
        event.preventDefault()
        agregarCliente(casoId)
    })

}

const cargarClientes = async (casoId) => {

    const resultado = await fetch(`/api/v1/clientes/caso/${casoId}`)
    const dataCliente = await resultado.json()

    switch (resultado.status) {
        case 200:

            let listaClientes = ''

            dataCliente.mensaje.forEach(cliente => {
                listaClientes +=
                    `
                    <input type="checkbox" name="checkbox" id="check-cliente" value=${cliente.id}>
                    <label for=${cliente.id}>${cliente.nombre}</label><br> <br> 
                    `
            });

            document.getElementById('form-agregar-cliente').innerHTML = listaClientes + `<input type="submit" id="boton-agregar" value="Agregar"></input>`

            break;

        default:
            document.getElementById('mensaje1').innerHTML = dataCliente.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}

const agregarCliente = async (casoId) => {

    const clientes = document.getElementById('form-agregar-cliente').checkbox

    let clientesChecked = 0

    for (let i = 0; i < clientes.length; i++) {

        if (clientes[i].checked) {
            clientesChecked++
        }
    }

    if (clientes.length === undefined && clientes.checked) {

        const resultado = await fetch(`/api/v1/casos/cliente/${casoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clienteId: clientes.value
            })
        })

        const dataCliente = await resultado.json()

        switch (resultado.status) {
            case 201:
                document.getElementById('mensaje-1').innerHTML = dataCliente.mensaje

                document.getElementById('dialogo-1').showModal()
                document.getElementById('cerrar-1').addEventListener('click', () => {
                    window.location.assign('visualizar-caso')
                })
                break;

            default:
                document.getElementById('mensaje-1').innerHTML = dataCliente.mensaje
                document.getElementById('dialogo-1').showModal()
                document.getElementById('cerrar-1').addEventListener('click', () => {
                    document.getElementById('dialogo-1').close()
                })
                break;
        }

        return;
    }

    let contador = 0

    for (let i = 0; i < clientes.length; i++) {

        if (clientes[i].checked) {

            const clienteId = document.getElementById('form-agregar-cliente').checkbox[i].value

            const resultado = await fetch(`/api/v1/casos/cliente/${casoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clienteId: clienteId
                })
            })

            if (contador == (clientesChecked - 1)) {

                const dataCliente = await resultado.json()

                switch (resultado.status) {
                    case 201:
                        document.getElementById('mensaje-1').innerHTML = dataCliente.mensaje

                        document.getElementById('dialogo-1').showModal()
                        document.getElementById('cerrar-1').addEventListener('click', () => {
                            window.location.assign('visualizar-caso')
                        })
                        break;

                    default:
                        document.getElementById('mensaje-1').innerHTML = dataCliente.mensaje
                        document.getElementById('dialogo-1').showModal()
                        document.getElementById('cerrar-1').addEventListener('click', () => {
                            document.getElementById('dialogo-1').close()
                        })
                        break;
                }
            }

            contador++
        }
    }
}

const eliminarCaso = async (casoId) => {
    const resultado = await fetch(`/api/v1/casos/${casoId}`, {
        method: 'DELETE'
    })

    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}

const eliminarNota = async (notaId, casoId) => {

    const resultado = await fetch(`/api/v1/casos/${casoId}/${notaId}`, {
        method: 'DELETE'
    })

    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}

const eliminarCliente = async (clienteId, casoId) => {
    const resultado = await fetch(`/api/v1/casos/cliente/${casoId}/${clienteId}`, {
        method: 'DELETE'
    })

    const data = await resultado.json()

    switch (resultado.status) {
        case 201:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}


