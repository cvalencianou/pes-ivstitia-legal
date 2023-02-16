document.getElementById('cerrar').addEventListener('click', () => {
    document.getElementById('dialogo').close()
    document.getElementById('contrasena').value = ''
})

document.getElementById('form-iniciar-sesion').addEventListener('submit', (event) => {
    event.preventDefault()
    iniciarSesion()
})

const iniciarSesion = async () => {

    const correo = document.getElementById('correo').value
    const contrasena = document.getElementById('contrasena').value

    const resultado = await fetch('/api/v1/usuarios/auth', {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo,
            contrasena: contrasena
        })
    })

    const status = resultado.status
    const data = await resultado.json()

    switch (status) {
        case 200:
            sessionStorage.setItem('autenticado', data.autenticado)
            sessionStorage.setItem('administrador', data.administrador)
            window.location.replace('inicio')
            break;
        case 307:
            sessionStorage.setItem('correo', correo)
            window.location.assign('/cambiar-contrasena')
            break;
        default:
            document.getElementById('correo').style.borderColor = 'red'
            document.getElementById('contrasena').style.borderColor = 'red'
            document.getElementById('mensaje').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
            break;
    }
}



