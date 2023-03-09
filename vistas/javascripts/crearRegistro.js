window.onpageshow = async () => {
    document.getElementById('form-registro').addEventListener('submit', (event) => {
        event.preventDefault()
        crearRegistro()
    })
}

//Función para crear un nuevo registro
const crearRegistro = async () => {
    const nombre = document.getElementById('nuevo-registro').value

    const resultado = await fetch('/api/v1/registros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre
        })

    })

    const datos = await resultado.json()

    if (resultado.status === 201) {

        document.getElementById('nuevo-registro').value = ''
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        document.getElementById('cerrar-1').addEventListener('click', () => {
            document.getElementById('dialogo-1').close()
            window.location.replace('administrar-calculos')
        })
    } else {

        document.getElementById('nuevo-registro').style.borderColor = 'red'
        document.getElementById('mensaje-1').innerHTML = datos.mensaje
        document.getElementById('dialogo-1').showModal()
        document.getElementById('cerrar-1').addEventListener('click', () => {
            document.getElementById('dialogo-1').close()
        })
    }


}