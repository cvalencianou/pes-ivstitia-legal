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
            <h2>Tributos</h2>
            ${datos.mensaje.registro ? `TIMBRE DE REGISTRO: ${datos.mensaje.registro}<br>` : ''}
            ${datos.mensaje.agrario ? `TIMBRE AGRARIO: ${datos.mensaje.agrario}<br>` : ''}
            ${datos.mensaje.fiscal ? `TIMBRE FISCAL: ${datos.mensaje.fiscal}<br>` : ''}
            ${datos.mensaje.archivo ? `TIMBRE DE ARCHIVO: ${datos.mensaje.archivo}<br>` : ''}
            ${datos.mensaje.abogado ? `TIMBRE DE ABOGADO: ${datos.mensaje.abogado}<br>` : ''}
            ${datos.mensaje.municipal ? `TIMBRE MUNICIPAL: ${datos.mensaje.municipal}<br>` : ''}
            ${datos.mensaje.parquesNacionales ? `TIMBRE DE PARQUES NACIONALES: ${datos.mensaje.parquesNacionales}<br>` : ''}
            ${datos.mensaje.faunaSilvestre ? `TIMBRE DE FAUNA SILVESTRE: ${datos.mensaje.faunaSilvestre}<br>` : ''}
            ${datos.mensaje.cruzRoja ? `TIMBRE DE CRUZ ROJA: ${datos.mensaje.cruzRoja}<br>` : ''}
            <h2>Impuestos</h2>
            ${datos.mensaje.traspaso ? `IMPUESTO TRASPASO: ${datos.mensaje.traspaso}<br>` : ''}
            <h2>Honorarios</h2>
            ${datos.mensaje.honorarios ? `HONORARIOS: ${datos.mensaje.honorarios}<br>` : ''}
            <h2>Montos Adicionales</h2>
            ${datos.mensaje.adicionalPlacas ? `ADICIONAL PLACAS: ${datos.mensaje.adicionalPlacas}<br>` : ''}
            <h2>Totales</h2>
            ${datos.mensaje.totalTributos ? `TOTAL TRIBUTOS: ${Math.round(datos.mensaje.totalTributos * 100) / 100}<br>` : ''}
            ${datos.mensaje.totalHonorarios ? `TOTAL HONORARIOS: ${Math.round(datos.mensaje.totalHonorarios * 100) / 100}<br>` : ''}
            ${datos.mensaje.totalHonorariosConIVA ? `TOTAL HONORARIOS CON IVA: ${Math.round(datos.mensaje.totalHonorariosConIVA * 100) / 100}<br>` : ''}
            ${datos.mensaje.totalTributos ? `TOTAL: ${Math.round(datos.mensaje.total * 100) / 100}<br>` : ''}
              
        `

        document.getElementById('seccion-calcular').style.display = 'none'
        document.getElementById('seccion-resultado').style.display = 'block'
    }
    else {
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
    }
}