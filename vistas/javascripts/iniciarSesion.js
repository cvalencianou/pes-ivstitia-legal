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

    const status = resultado.status
    const data = await resultado.json()

    switch (status) {
        case 200:
            sessionStorage.setItem('administrador', data.administrador)
            window.location.replace('inicio.html')
            break;
        case 400:
            document.getElementById('errores').innerHTML = data.mensaje
            document.getElementById('correo').style.borderColor = 'red'
            document.getElementById('contrasena').style.borderColor = 'red'
            break;
        case 401:
            document.getElementById('errores').innerHTML = data.mensaje
            document.getElementById('correo').style.borderColor = 'red'
            document.getElementById('contrasena').style.borderColor = 'red'
            break;
        case 409:
            document.getElementById('errores').innerHTML = data.mensaje
            document.getElementById('correo').style.borderColor = 'red'
            document.getElementById('contrasena').style.borderColor = 'red'
            break;
    }

}