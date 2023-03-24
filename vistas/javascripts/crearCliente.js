window.onpageshow = async () => {

    document.getElementById('form-crear-cliente').addEventListener('submit', (event) =>{
        event.preventDefault()
        crearCliente()
        window.location.assign('clientes')
    })

    document.getElementById('cerrar-1').addEventListener('click', () => {
        document.getElementById('dialogo-1').close()
    })
}

const crearCliente = async() =>{
    const nombreCliente = document.getElementById('nombre').value
    const tipoCedula = document.getElementById('tipo-cedula').value
    const cedula = document.getElementById('cedula').value
    const correo = document.getElementById('correo').value
    const telefonoFisico = document.getElementById('telefonoFisico').value
    const telefonoMovil = document.getElementById('telefonoMovil').value
    const direccion = document.getElementById('direccion').value

    const resultado = await fetch(`/api/v1/clientes/`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombreCliente,
            cedula: cedula,
            correo: correo,
            telefonoFisico: telefonoFisico,
            telefonoMovil: telefonoMovil,
            direccion: direccion,
            tipoCedula: tipoCedula            
        })
    })

    const datos = await resultado.json()

    switch (resultado.status) {
        case 201:
            document.getElementById('mensaje-1').innerHTML = datos.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    
        default:
            document.getElementById('mensaje-1').innerHTML = datos.mensaje
            document.getElementById('dialogo-1').showModal()
            break;
    }
}
