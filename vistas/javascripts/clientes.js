window.onpageshow = async () => {
    obtenerClientes()
}

const obtenerClientes = async () => {

    const resultado = await fetch('/api/v1/clientes')

    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            let listaClientes = ''

            data.mensaje.forEach(cliente => {
                listaClientes +=
                    `
                <li>
                Nombre: ${cliente.nombre}  Cedula: ${cliente.cedula}  <br><br>
                Teléfono movil: ${cliente.telefono_movil} Teléfono físico: ${cliente.telefono_fisico} <br><br>
                Correo: ${cliente.correo}    Dirección: ${cliente.direccion} 
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

const filtrarClientes = async () => {

    const resultado = await fetch('/api/v1/clientes/filtro')

    const data = await resultado.json()

    switch (resultado.status) {
        case 200:
            let listaClientes = ''

            data.mensaje.forEach(cliente => {
                listaClientes +=
                    `
                <li>
                Nombre: ${cliente.nombre}  Cedula: ${cliente.cedula}  <br><br>
                Teléfono movil: ${cliente.telefonoMovil} Teléfono físico: ${cliente.telefonoFisico} <br><br>
                Correo: ${cliente.correo}    Dirección: ${cliente.direccion} 
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
