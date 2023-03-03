window.onpageshow = async () => {

    document.getElementById('form-crear-acto').addEventListener('submit', (event) => {
        event.preventDefault()
        crearActo()
    })

    obtenerRegistros()
}

const crearActo = async () => {

    const nombre = document.getElementById('nuevo-acto').value
    const idRegistro = Number(document.getElementById('registros').value)

    let nuevoActo = {}

    nuevoActo['registro'] = Number(document.getElementById('check-registro').checked ? document.getElementById('timbre-registro').value : 0)
    nuevoActo['agrario'] = Number(document.getElementById('check-agrario').checked ? document.getElementById('timbre-agrario').value : 0)

    const arrayFiscal = []
    const listaFiscal = document.getElementById('lista-timbre-fiscal').children
    for (let index = 0; index < listaFiscal.length; index++) {
        arrayFiscal[index] = {
            id: index + 1,
            monto: Number(listaFiscal[index].children.item(0).value),
            hasta: Number(listaFiscal[index].children.item(1).value)
        }
    }
    nuevoActo['fiscal'] = document.getElementById('check-fiscal').checked ? arrayFiscal : 0

    const arrayArchivo = []
    const listaArchivo = document.getElementById('lista-timbre-archivo').children
    for (let index = 0; index < listaArchivo.length; index++) {
        arrayArchivo[index] = {
            id: index + 1,
            monto: Number(listaArchivo[index].children.item(0).value),
            hasta: Number(listaArchivo[index].children.item(1).value)
        }
    }
    nuevoActo['archivo'] = document.getElementById('check-archivo').checked ? arrayArchivo : 0

    const arrayAbogado = []
    const listaAbogado = document.getElementById('lista-timbre-abogado').children
    for (let index = 0; index < listaAbogado.length; index++) {
        arrayAbogado[index] = {
            id: index + 1,
            monto: Number(listaAbogado[index].children.item(0).value),
            hasta: Number(listaAbogado[index].children.item(1).value)
        }
    }
    nuevoActo['abogado'] = document.getElementById('check-abogado').checked ? arrayAbogado : 0

    nuevoActo['municipal'] = Number(document.getElementById('check-municipal').checked ? document.getElementById('timbre-municipal').value : 0)
    nuevoActo['parquesNacionales'] = Number(document.getElementById('check-parques-nacionales').checked ? document.getElementById('timbre-parques-nacionales').value : 0)
    nuevoActo['faunaSilvestre'] = Number(document.getElementById('check-fauna-silvestre').checked ? document.getElementById('timbre-fauna-silvestre').value : 0)
    nuevoActo['cruzRoja'] = Number(document.getElementById('check-cruz-roja').checked ? document.getElementById('timbre-cruz-roja').value : 0)
    nuevoActo['traspaso'] = Number(document.getElementById('check-traspaso').checked ? document.getElementById('impuesto-traspaso').value : 0)

    const arrayHonorarios = []
    const listaHonorarios = document.getElementById('lista-honorarios').children
    for (let index = 0; index < listaHonorarios.length; index++) {
        arrayHonorarios[index] = {
            id: index + 1,
            monto: Number(listaHonorarios[index].children.item(0).value),
            porcentaje: Number(listaHonorarios[index].children.item(1).value)
        }
    }
    nuevoActo['honorarios'] = document.getElementById('check-honorarios').checked ? arrayHonorarios : 0

    if (document.getElementById('check-honorarios-mitad').checked && nuevoActo['honorarios'].length > 0) {
        nuevoActo['honorarios'].push(
            {
                id: 6,
                porcentaje: Number(0.5)
            }
        )
    }

    nuevoActo['adicionalPlacas'] = Number(document.getElementById('check-adicional-placas').checked
        && document.getElementById('check-honorarios').checked
        ? document.getElementById('adicional-placas').value : 0)


    for (const valor in nuevoActo) {
        if (!nuevoActo[valor]) {
            delete nuevoActo[valor]
        }
    }

    const resultado = await fetch('/api/v1/actos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            idRegistro: idRegistro,
            tributosHonorarios: JSON.stringify(nuevoActo)
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 201) {

        document.getElementById('nuevo-acto').value = ''
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        obtenerRegistros()
        document.getElementById('cerrar-1').addEventListener('click', () => {
            document.getElementById('dialogo-1').close()
            window.location.replace('administrar-calculos')
        })
    } else {

        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        document.getElementById('cerrar-1').addEventListener('click', () => {
            document.getElementById('dialogo-1').close()
        })
    }
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
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}