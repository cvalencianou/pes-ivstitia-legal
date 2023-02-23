window.onpageshow = async () => {
    obtenerClientes()
}

const obtenerClientes = async () => {

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
                Tipo proceso: ${caso.tipo_proceso_id} <br><br>
                Estado: ${caso.estado_id} <br><br>
                Lugar de estado proceso: ${caso.lugar_estado_proceso_id} 
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