window.onload = async () => {

    validarSesion()
    validarRol()

    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        cerrarSesion()
    })
}

window.onpageshow = async () => {
    validarSesion()
}

window.onunload = async () => {
    validarSesion()
}

//Función para cerrar sesión desde menú de opciones
const cerrarSesion = async () => {

    sessionStorage.removeItem('autenticado')
    sessionStorage.removeItem('administrador')

    await fetch('/api/v1/usuarios/auth', {
        method: 'GET'
    })

    window.location.replace('iniciar-sesion')
}

//Función para validar que la sesión del usuario es válida desde menú de opciones
const validarSesion = async () => {

    if (!sessionStorage.getItem('autenticado') || sessionStorage.getItem('autenticado') != 'true') {
        window.location.replace('iniciar-sesion')
    }
}

//Función para validar rol de usuario y mostrar opciones en navegación desde menú de opciones
const validarRol = async () => {

    const tipoUsuario = sessionStorage.getItem('administrador')

    if (!tipoUsuario) {
        return window.location.replace('iniciar-sesion')
    }

    if (Number(tipoUsuario) === 1) {
        const enlaces =
            `
        <a href="calculos"><button>Cálculos</button></a>
        <a href="casos"><button>Casos</button></a>
        <a href="clientes"><button>Clientes</button></a>
        <a href="administrar-calculos"><button>Administrar cálculos</button></a>
        <a href="administrar-usuarios"><button>Administrar usuarios</button></a>
        <a><button id="cerrar-sesion"">Cerrar sesión</button></a>
        `
        document.getElementById('enlaces').innerHTML = enlaces
    }
    else {
        const enlaces =
            `
        <a href="calculos"><button>Cálculos</button></a>
        <a href="casos"><button>Casos</button></a>
        <a href="clientes"><button>Clientes</button></a>
        <a><button id="cerrar-sesion"">Cerrar sesión</button></a>
        `
        document.getElementById('enlaces').innerHTML = enlaces
    }
}