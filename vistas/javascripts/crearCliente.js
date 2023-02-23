window.onpageshow = async () => {

    document.getElementById('form-crear-cliente').addEventListener('submit', (event) =>{
        event.preventDefault()

        crearCliente()

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

    const resultado = await fetch('/api/v1/clientes', {
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

    const data = await resultado.json()

    if (resultado.status === 201) {
        alert(data.mensaje)
    }
    else{
        alert(data.mensaje)
    }
}
