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
    const fisico = document.getElementById('fisico').value
    const movil = document.getElementById('movil').value
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
            numeroFisico: fisico,
            numeroMovil: movil,
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