window.onpageshow = async () => {

    if (!sessionStorage.getItem('correo')) {
        window.location.replace('iniciar-sesion')
    }

    document.getElementById('form-cambiar-contrasena').addEventListener('submit', (event) => {
        event.preventDefault()
        cambiarContrasena()
    })
}

const cambiarContrasena = async () => {

    const correo = sessionStorage.getItem('correo')
    const contrasenaActual = document.getElementById('contrasena-actual').value
    const contrasenaNueva = document.getElementById('contrasena-nueva').value

    const resultado = await fetch('/api/v1/usuarios/auth', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo,
            contrasenaActual: contrasenaActual,
            contrasenaNueva: contrasenaNueva
        })
    })

    const status = resultado.status
    const data = await resultado.json()

    const dialogo = document.getElementById('dialogo')
    const cerrar = document.getElementById('cerrar')

    switch (status) {
        case 200:
            sessionStorage.removeItem('correo')
            cerrar.onclick = () => {
                dialogo.close()
                window.location.replace('/iniciar-sesion')
            }
            document.getElementById('error').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
            break;
        default:
            cerrar.onclick = () => {
                dialogo.close()
            }
            document.getElementById('contrasena-actual').value = ''
            document.getElementById('contrasena-nueva').value = ''
            document.getElementById('contrasena-actual').style.borderColor = 'red'
            document.getElementById('error').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
            break;
    }
}