window.onpageshow = async () => {

    document.getElementById('buscarCasos').addEventListener('submit', (event) => {
        event.preventDefault()
        filtrarCasos()
    })

    document.getElementById('cerrar-1').addEventListener('click', () => {
        document.getElementById('dialogo-1').close()
    })

    document.getElementById('lista-casos').addEventListener('click', (event) => {

        if (event.target.type !== 'submit') {
            return
        }

        if (event.target.innerHTML === 'Ver') {
            sessionStorage.removeItem("casoId")
            sessionStorage.setItem("casoId", event.target.value)
            window.location.assign('visualizar-caso')
        }


        if (event.target.innerHTML === 'Eliminar') {

            document.getElementById('eliminar-caso').addEventListener('click', () => {
                eliminarCaso(event.target.value)
                document.getElementById('dialogo-eliminar-caso').close()
                window.location.assign('casos')
            })

            document.getElementById('eliminar-cancelar-caso').addEventListener('click', () => {
                window.location.assign('casos')
            })

            document.getElementById('dialogo-eliminar-caso').showModal()
        }
    })

    obtenerCasos()
}

const obtenerCasos = async () => {

    const resultado = await fetch('/api/v1/casos')

    const data = await resultado.json()

    console.log(resultado.status)

    switch (resultado.status) {
        case 200:
            let listaCasos = ''

            data.mensaje.forEach(caso => {
                listaCasos +=
                    `
                <li>
                <b>Nombre caso:</b> ${caso.nombre}  <br><br>
                <b>Despacho:</b> ${caso.despacho}  <br><br>
                <b>Desripción:</b> ${caso.descripcion}  <br><br>
                <b>Tipo proceso:</b> ${caso.tipo_proceso} <br><br>
                <b>Estado:</b> ${caso.estado} <br><br>
                <div id="botones-casos">
                <button class="boton" id="boton" value="${caso.id}">Ver</button>
                <button class="boton" id="boton" value="${caso.id}">Eliminar</button>
                </div>
                </li>
                `
            });

            document.getElementById('lista-casos').innerHTML = listaCasos

            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                document.getElementById('dialogo-1').close()
            })
            break;
    }

}

const filtrarCasos = async () => {
    const datoCaso = document.getElementById('dato').value

    const resultado = await fetch(`/api/v1/casos/filtro?datoCaso=${datoCaso}`)

    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            let listaCasos = ''

            data.mensaje.forEach(caso => {
                listaCasos +=
                    `
                <li>
                Nombre caso: ${caso.nombre}  <br><br>
                Despacho: ${caso.despacho}  <br><br>
                Desripción: ${caso.descripcion}  <br><br>
                Tipo proceso: ${caso.tipo_proceso} <br><br>
                Estado: ${caso.estado} <br><br>
                
                <button value="${caso.id}">Eliminar</button>
                </li>
                `
            });

            document.getElementById('lista-casos').innerHTML = listaCasos

            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
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
            obtenerCasos()
            break;

        default:
            document.getElementById('mensaje-1').innerHTML = data.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}