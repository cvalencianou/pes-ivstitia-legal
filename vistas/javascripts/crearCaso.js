window.onpageshow = async () => {

    document.getElementById('form-crear-caso').addEventListener('submit', (event) => {
        event.preventDefault()
        crearCaso()
    })
}

const crearCaso = async () => {
    const nombre = document.getElementById('nombre-caso').value
    const despacho = document.getElementById('despacho').value
    const descripcion = document.getElementById('descripcion').value
    const tipoProceso = document.getElementById('tipo-proceso').value
    const estado = document.getElementById('estado').value

    const resultado = await fetch('/api/v1/casos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            despacho: despacho,
            descripcion: descripcion,
            tipoProceso: tipoProceso,
            estado: estado
        })
    })

    const datos = await resultado.json()

    switch (resultado.status) {
        case 201:
            document.getElementById('mensaje-1').innerHTML = datos.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                window.location.assign('casos')
            })

            break;

        default:
            document.getElementById('mensaje-1').innerHTML = datos.mensaje
            document.getElementById('dialogo-1').showModal()
            document.getElementById('cerrar-1').addEventListener('click', () => {
                document.getElementById('dialogo-1').close()
            })
            break;
    }
}