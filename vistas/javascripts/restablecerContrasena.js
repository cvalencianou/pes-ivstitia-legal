window.onpageshow = () => {

    document.getElementById('form-restablecer-contrasena').addEventListener('submit', (event) => {
        event.preventDefault()
        restablecerContrasena()
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

    const datos = await resultado.json()

    if (resultado.status === 200) {
        document.getElementById('error').innerHTML = datos.mensaje + `. \n Revise su correo electrónico ${correo}`
        document.getElementById('cerrar').addEventListener('click', () => {
            document.getElementById('dialogo').close()
            window.location.replace('iniciar-sesion')
        })
        document.getElementById('dialogo').showModal()
    } else {
        document.getElementById('correo').style.borderColor = 'red'
        document.getElementById('error').innerHTML = datos.mensaje
        document.getElementById('cerrar').addEventListener('click', () => {
            document.getElementById('dialogo').close()
        })
        document.getElementById('dialogo').showModal()
    }
}