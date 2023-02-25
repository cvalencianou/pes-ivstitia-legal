window.onpageshow = async () => {

    document.getElementById('registros').addEventListener('change', () => {
        obtenerActosPorIdRegistro()
    })

    document.getElementById('form-calcular').addEventListener('submit', (event) => {
        event.preventDefault()
        realizarCalculo()
    })

    document.getElementById('cerrar-1').addEventListener('click', () => {
        document.getElementById('dialogo-1').close()
    })

    document.getElementById('resultado-boton').addEventListener('click', () => {
        window.location.assign('calculos')
    })

    document.getElementById('seccion-resultado').style.display = 'none'

    obtenerRegistros()
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

        obtenerActosPorIdRegistro()
    }
    else {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}

const obtenerActosPorIdRegistro = async () => {

    const resultado = await fetch(`/api/v1/actos/registro/${document.getElementById('registros').value}`)

    const datos = await resultado.json()

    if (resultado.status === 200) {

        let listaActos = ''

        datos.mensaje.forEach(acto => {
            listaActos +=
                `
          <option value="${acto.id}">${acto.nombre}</option>
          `
        })
        document.getElementById('div-calcular').style.display = 'block'
        document.getElementById('actos').innerHTML = listaActos
    }
    else {
        document.getElementById('div-calcular').style.display = 'none'
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}

const realizarCalculo = async () => {

    const acto = document.getElementById('actos').value
    const montoConsulta = document.getElementById('monto-calculo').value

    const resultado = await fetch(`/api/v1/actos/calculo/${acto}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            montoConsulta: montoConsulta
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        document.getElementById('resultado-calculo').innerHTML =
            `
        REGISTRO: ${datos.mensaje.registro} <br>
        AGRARIO: ${datos.mensaje.agrario} <br>
        FISCAL: ${datos.mensaje.fiscal} <br>
        ARCHIVO: ${datos.mensaje.archivo} <br>
        ABOGADO: ${datos.mensaje.abogado} <br>
        MUNICIPAL: ${datos.mensaje.municipal} <br>
        TRASPASO: ${datos.mensaje.traspaso} <br>
        HONORARIOS: ${datos.mensaje.honorarios} <br>
        `

        document.getElementById('seccion-calcular').style.display = 'none'
        document.getElementById('seccion-resultado').style.display = 'block'
    }
    else {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}