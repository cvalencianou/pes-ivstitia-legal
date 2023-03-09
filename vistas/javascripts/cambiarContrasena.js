window.onpageshow = async () => {

    if (!sessionStorage.getItem('correo')) {
        window.location.replace('iniciar-sesion')
    }

    document.getElementById('form-cambiar-contrasena').addEventListener('submit', (event) => {
        event.preventDefault()
        cambiarContrasena()
    })
}

//Función para establecer una nueva contraseña
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

    const datos = await resultado.json()

    if (resultado.status === 200) {
        sessionStorage.removeItem('correo')
        document.getElementById('cerrar').onclick = () => {
            document.getElementById('dialogo').close()
            window.location.replace('/iniciar-sesion')
        }
        document.getElementById('error').innerHTML = datos.mensaje
        document.getElementById('dialogo').showModal()
    } else {
        document.getElementById('cerrar').onclick = () => {
            document.getElementById('dialogo').close()
        }
        document.getElementById('contrasena-actual').value = ''
        document.getElementById('contrasena-nueva').value = ''
        document.getElementById('contrasena-actual').style.borderColor = 'red'
        document.getElementById('error').innerHTML = datos.mensaje
        document.getElementById('dialogo').showModal()
    }
}