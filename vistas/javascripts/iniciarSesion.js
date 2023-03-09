window.onpageshow = async () => {

    if (sessionStorage.getItem('autenticado') && sessionStorage.getItem('administrador')) {
        window.location.replace('inicio')
    }

    document.getElementById('cerrar').addEventListener('click', () => {
        document.getElementById('dialogo').close()
        document.getElementById('contrasena').value = ''
    })

    document.getElementById('form-iniciar-sesion').addEventListener('submit', (event) => {
        event.preventDefault()
        iniciarSesion()
    })
}

//Función para iniciar sesión con credenciales
const iniciarSesion = async () => {

    const correo = document.getElementById('correo').value
    const contrasena = document.getElementById('contrasena').value

    const resultado = await fetch('/api/v1/usuarios/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo,
            contrasena: contrasena
        })
    })

    const datos = await resultado.json()

    if (resultado.status === 200) {
        sessionStorage.setItem('autenticado', datos.autenticado)
        sessionStorage.setItem('administrador', datos.administrador)
        window.location.replace('inicio')
    }
    else if (resultado.status === 307) {
        sessionStorage.setItem('correo', correo)
        window.location.assign('/cambiar-contrasena')
    }
    else {
        document.getElementById('correo').style.borderColor = 'red'
        document.getElementById('contrasena').style.borderColor = 'red'
        document.getElementById('mensaje').innerHTML = datos.mensaje
        document.getElementById('dialogo').showModal()
    }
}



