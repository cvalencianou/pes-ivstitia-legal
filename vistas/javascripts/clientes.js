window.onpageshow = async () => {
    obtenerClientes()
}

const obtenerClientes = async () => {
    
    const resultado = await fetch('/api/v1/clientes')

    const status = resultado.status
    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            let listaClientes = ''

            data.mensaje.forEach(cliente => {
                listaClientes +=
                `
                <li>
                Nombre: ${cliente.nombre} <br><br>
                Cedula: ${cliente.cedula} <br><br>
                Correo: ${cliente.correo} <br><br>
                Teléfono movil: ${cliente.movil} <br><br>
                Teléfono físico: ${cliente.fisico} <br><br>
                Dirección: ${cliente.direccion} <br><br><br><br>
                </li>
                `
            });

            document.getElementById('lista-clientes').innerHTML = listaClientes

            break;
    
        default:
            alert(data.mensaje)
            break;
    }

}