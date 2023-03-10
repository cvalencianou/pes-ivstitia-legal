window.onpageshow = async () => {

    document.getElementById('buscarCliente').addEventListener('submit', (event) => {
        event.preventDefault()
        filtrarClientes()
    })

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
                Correo: ${cliente.correo}    Dirección: ${cliente.direccion} <br><br>
                <a href="actualizar-cliente" id="btnActualizarCliente"><button>ACTUALIZAR CLIENTE</button></a>
                <a href="eliminar-cliente" id="btnEliminarCliente"><button>ELIMINAR CLIENTE</button></a>
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
    const datoCliente = document.getElementById('datoCliente').value

    const resultado = await fetch(`/api/v1/clientes/filtro?datoCliente=${datoCliente}`)

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
                <a href="actualizar-cliente" id="btnActualizarCliente"><button>ACTUALIZAR CLIENTE</button></a>
                <a href="eliminar-cliente" id="btnEliminarCliente"><button>ELIMINAR CLIENTE</button></a>
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
