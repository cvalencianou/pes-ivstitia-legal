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
                <a href="visualizar-caso" id="btnVisualizarCaso"><button> Ver caso</button></a>
                <a href="eliminar-caso" id="btnEliminarCaso"><button>Eliminar caso</button></a>
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
                <a href="visualizar-caso" id="btnVisualizarCaso"><button> Ver caso</button></a>
                <a href="eliminar-caso" id="btnEliminarCaso"><button>Eliminar caso</button></a>
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
