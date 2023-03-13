window.onpageshow = async () => {

    document.getElementById('buscarCasos').addEventListener('submit', (event) => {
        event.preventDefault()
        filtrarCasos()
    })

    obtenerCasos()
}

const obtenerCasos = async () => {

    const resultado = await fetch('/api/v1/casos')

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
                <a href="actualizar-caso" id="btnActualizarCaso"><button>ACTUALIZAR CASO</button></a>
                <a href="eliminar-caso" id="btnEliminarCaso"><button>ELIMINAR CASO</button></a>
                <a href="agregar-nota" id="btnAgregarNotaCaso"><button>Agregar Nota</button></a>
                <a href="agregar-cliente" id="btnAgregarCliente"><button>Agregar Cliente</button></a>
                </li>
                `
            });

            document.getElementById('lista-casos').innerHTML = listaCasos

            break;

        default:
            alert(data.mensaje)
            break;
    }

}

const filtrarCasos = async () => {
    const datoCaso = document.getElementById('datoCaso').value

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
                Lugar de estado proceso: ${caso.lugar_estado_proceso} 
                </li>
                `
            });

            document.getElementById('lista-casos').innerHTML = listaCasos

            break;

        default:
            alert(data.mensaje)
            break;
    }

}