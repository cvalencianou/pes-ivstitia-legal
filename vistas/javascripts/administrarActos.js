window.onpageshow = async () => {

    await obtenerRegistros()

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
                window.location.assign('administrar-actos')
            })
        }
    })

    document.getElementById('seccion-modificar-acto').style.display = 'none'

}

//Función para obtener lista de registros
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
        obtenerActosPorIdRegistro()
    }
    else {
        document.getElementById('cerrar-1').addEventListener('click', () => {
            window.location.replace('administrar-calculos')
        })
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}

//Función para obtener lista de acto de un registro específico
const obtenerActosPorIdRegistro = async () => {

    const resultado = await fetch(`/api/v1/actos/registro/${document.getElementById('registros-tabla').value}`)

    const datos = await resultado.json()

    if (resultado.status === 200) {

        let listaActos = ''

        datos.mensaje.forEach(acto => {
            listaActos +=
                `
                <tr id="${acto.id}">
                    <td class="id-acto">${acto.id}</td>
                    <td class="nombre-acto">${acto.nombre}</td>
               
                    <td class="tareas-acto">
                        <button value="${acto.id}">Actualizar</button>
                        <button value="${acto.id}">Eliminar</button>
                    </td>
                </tr>
          `
        })

        document.getElementById('tabla-actos').innerHTML = listaActos
    }
    else {
        document.getElementById('tabla-actos').innerHTML = ''
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}

//Función para eliminar un acto
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

//Función previa a actualizar para mostrar sección de actualizar
const abrirActualizarActo = async (id) => {
    document.getElementById('seccion-actos').style.display = 'none'
    document.getElementById('titulo-principal').style.display = 'none'
    document.getElementById('seccion-modificar-acto').style.display = 'block'
    await obtenerActoPorId(id)

    document.getElementById('form-modificar-acto').addEventListener('submit', (event) => {
        event.preventDefault()
        actualizarActo(id)
    })
}

//Función para actualizar acto con nuevos valores
const actualizarActo = async (id) => {
    const nombre = document.getElementById('nombre-acto').value

    let acto = {}

    acto['registro'] = Number(document.getElementById('check-registro').checked ? document.getElementById('timbre-registro').value : 0)
    acto['agrario'] = Number(document.getElementById('check-agrario').checked ? document.getElementById('timbre-agrario').value : 0)

    const arrayFiscal = []
    const listaFiscal = document.getElementById('lista-timbre-fiscal').children
    for (let index = 0; index < listaFiscal.length; index++) {
        arrayFiscal[index] = {
            id: index + 1,
            monto: Number(listaFiscal[index].children.item(0).value),
            hasta: Number(listaFiscal[index].children.item(1).value)
        }
    }
    acto['fiscal'] = document.getElementById('check-fiscal').checked ? arrayFiscal : 0

    const arrayArchivo = []
    const listaArchivo = document.getElementById('lista-timbre-archivo').children
    for (let index = 0; index < listaArchivo.length; index++) {
        arrayArchivo[index] = {
            id: index + 1,
            monto: Number(listaArchivo[index].children.item(0).value),
            hasta: Number(listaArchivo[index].children.item(1).value)
        }
    }
    acto['archivo'] = document.getElementById('check-archivo').checked ? arrayArchivo : 0

    const arrayAbogado = []
    const listaAbogado = document.getElementById('lista-timbre-abogado').children
    for (let index = 0; index < listaAbogado.length; index++) {
        arrayAbogado[index] = {
            id: index + 1,
            monto: Number(listaAbogado[index].children.item(0).value),
            hasta: Number(listaAbogado[index].children.item(1).value)
        }
    }
    acto['abogado'] = document.getElementById('check-abogado').checked ? arrayAbogado : 0

    acto['municipal'] = Number(document.getElementById('check-municipal').checked ? document.getElementById('timbre-municipal').value : 0)
    acto['parquesNacionales'] = Number(document.getElementById('check-parques-nacionales').checked ? document.getElementById('timbre-parques-nacionales').value : 0)
    acto['faunaSilvestre'] = Number(document.getElementById('check-fauna-silvestre').checked ? document.getElementById('timbre-fauna-silvestre').value : 0)
    acto['cruzRoja'] = Number(document.getElementById('check-cruz-roja').checked ? document.getElementById('timbre-cruz-roja').value : 0)
    acto['traspaso'] = Number(document.getElementById('check-traspaso').checked ? document.getElementById('impuesto-traspaso').value : 0)

    const arrayHonorarios = []
    const listaHonorarios = document.getElementById('lista-honorarios').children
    for (let index = 0; index < listaHonorarios.length; index++) {
        arrayHonorarios[index] = {
            id: index + 1,
            monto: Number(listaHonorarios[index].children.item(0).value),
            porcentaje: Number(listaHonorarios[index].children.item(1).value)
        }
    }
    acto['honorarios'] = document.getElementById('check-honorarios').checked ? arrayHonorarios : 0

    if (document.getElementById('check-honorarios-mitad').checked && acto['honorarios'].length > 0) {
        acto['honorarios'].push(
            {
                id: 6,
                porcentaje: Number(0.5)
            }
        )
    }

    acto['adicionalPlacas'] = Number(document.getElementById('check-adicional-placas').checked
        && document.getElementById('check-honorarios').checked
        ? document.getElementById('adicional-placas').value : 0)


    for (const valor in acto) {
        if (!acto[valor]) {
            delete acto[valor]
        }
    }

    const resultado = await fetch(`/api/v1/actos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            tributosHonorarios: JSON.stringify(acto)
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        document.getElementById('mensaje-4').innerHTML = datos.mensaje
        document.getElementById('dialogo-4').showModal()
        document.getElementById('cerrar-4').addEventListener('click', () => {
            window.location.assign('administrar-actos')
        })
    } else {
        document.getElementById('nombre-acto').style.borderColor = 'red'
        document.getElementById('mensaje-4').innerHTML = datos.mensaje
        document.getElementById('dialogo-4').showModal()
    }
}

//Función para obtener datos de acto que se va a actualizar
const obtenerActoPorId = async (id) => {

    const resultado = await fetch(`/api/v1/actos/${id}`)

    const datos = (await resultado.json()).mensaje

    if (resultado.status === 200) {

        document.getElementById('nombre-acto').value = datos.nombre

        datos['tributosHonorarios'].registro ?
            document.getElementById('timbre-registro').value = datos['tributosHonorarios'].registro
            : document.getElementById('check-registro').checked = false

        datos['tributosHonorarios'].agrario ?
            document.getElementById('timbre-agrario').value = datos['tributosHonorarios'].agrario
            : document.getElementById('check-agrario').checked = false


        if (datos['tributosHonorarios'].fiscal) {
            const listaFiscal = document.getElementById('lista-timbre-fiscal').children
            const fiscal = datos['tributosHonorarios'].fiscal
            for (let index = 0; index < listaFiscal.length; index++) {
                listaFiscal[index].children.item(0).value = fiscal[index].monto
                listaFiscal[index].children.item(1).value = fiscal[index].hasta
            }
        } else {
            document.getElementById('check-fiscal').checked = false
        }

        if (datos['tributosHonorarios'].archivo) {
            const listaArchivo = document.getElementById('lista-timbre-archivo').children
            const archivoAlmacenado = datos['tributosHonorarios'].archivo
            for (let index = 0; index < listaArchivo.length; index++) {
                listaArchivo[index].children.item(0).value = archivoAlmacenado[index].monto
                listaArchivo[index].children.item(1).value = archivoAlmacenado[index].hasta
            }
        } else {
            document.getElementById('check-archivo').checked = false
        }

        if (datos['tributosHonorarios'].abogado) {
            const listaAbogado = document.getElementById('lista-timbre-abogado').children
            const abogadoAlmacenado = datos['tributosHonorarios'].abogado
            for (let index = 0; index < listaAbogado.length; index++) {
                listaAbogado[index].children.item(0).value = abogadoAlmacenado[index].monto
                listaAbogado[index].children.item(1).value = abogadoAlmacenado[index].hasta
            }
        } else {
            document.getElementById('check-abogado').checked = false
        }

        datos['tributosHonorarios'].municipal ?
            document.getElementById('timbre-municipal').value = datos['tributosHonorarios'].municipal
            : document.getElementById('check-municipal').checked = false

        datos['tributosHonorarios']['parques_nacionales'] ?
            document.getElementById('timbre-parques-nacionales').value = datos['tributosHonorarios']['parques_nacionales']
            : document.getElementById('check-parques-nacionales').checked = false

        datos['tributosHonorarios']['fauna_silvestre'] ?
            document.getElementById('timbre-fauna-silvestre').value = datos['tributosHonorarios']['fauna_silvestre']
            : document.getElementById('check-fauna-silvestre').checked = false

        datos['tributosHonorarios']['cruz_roja'] ?
            document.getElementById('timbre-cruz-roja').value = datos['tributosHonorarios']['cruz_roja']
            : document.getElementById('check-cruz-roja').checked = false

        datos['tributosHonorarios'].traspaso ?
            document.getElementById('impuesto-traspaso').value = datos['tributosHonorarios'].traspaso
            : document.getElementById('check-traspaso').checked = false


        if (datos['tributosHonorarios'].honorarios) {
            const listaHonorarios = document.getElementById('lista-honorarios').children
            const honorariosAlmacenado = datos['tributosHonorarios'].honorarios
            for (let index = 0; index < listaHonorarios.length; index++) {
                listaHonorarios[index].children.item(0).value = honorariosAlmacenado[index].monto
                listaHonorarios[index].children.item(1).value = honorariosAlmacenado[index].porcentaje
            }
        } else {
            document.getElementById('check-honorarios').checked = false
        }

        datos['tributosHonorarios'].honorarios && datos['tributosHonorarios'].honorarios[5] ?
            document.getElementById('honorarios-mitad').value = datos['tributosHonorarios'].honorarios[5].porcentaje
            : document.getElementById('check-honorarios-mitad').checked = false

        datos['tributosHonorarios']['adicional_placas'] ?
            document.getElementById('adicional-placas').value = datos['tributosHonorarios']['adicional_placas']
            : document.getElementById('check-adicional-placas').checked = false
    }
    else {
        document.getElementById('mensaje-4').innerHTML = datos.mensaje
        document.getElementById('dialogo-4').showModal()
    }
}