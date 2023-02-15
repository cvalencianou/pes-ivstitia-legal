window.onload = () => {

    const dialogo = document.getElementById('dialogo')
    const cerrar = document.getElementById('cerrar')

    cerrar.addEventListener('click', () => {
        dialogo.close()
        window.location.replace('iniciar-sesion.html')
    })
}

const restablecerContrasena = async () => {

    const correo = document.getElementById('correo').value

    const resultado = await fetch('/api/v1/usuarios/auth/restablecer',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: correo
            })
        })

    const status = resultado.status
    const data = await resultado.json()

    switch (status) {
        case 200:
            document.getElementById('error').innerHTML = data.mensaje + ` \n. Revise su correo electrónico ${correo}`
            document.getElementById('dialogo').showModal()
            break;
        default:
            document.getElementById('error').innerHTML = data.mensaje
            document.getElementById('dialogo').showModal()
            break;
    }
}