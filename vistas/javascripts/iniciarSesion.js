window.onload = () => {
    const dialogo = document.getElementById('dialogo')
    const cerrar = document.getElementById('cerrar')

    cerrar.addEventListener('click', () => {
        dialogo.close()
        document.getElementById('contrasena').value = ''
    })
}


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
            window.location.replace('inicio.html')
            break;
        case 307:
            sessionStorage.setItem('correo', correo)
            window.location.assign('/cambiar-contrasena.html')
        break;
        default:
            document.getElementById('correo').style.borderColor = 'red'
            document.getElementById('contrasena').style.borderColor = 'red'
            document.getElementById('error').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
            break;
    }

}



