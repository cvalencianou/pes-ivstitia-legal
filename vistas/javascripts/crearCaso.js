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

    const data = await resultado.json()

    if (resultado.status === 201) {
        alert(data.mensaje)
    }
    else {
        alert(data.mensaje)
    }
}