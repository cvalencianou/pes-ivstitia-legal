window.onload = async () => {

    validarSesion()
    validarRol()

    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        cerrarSesion()
    })
}

window.onunload = async () => {
    validarSesion()
}

const cerrarSesion = async () => {

    sessionStorage.removeItem('autenticado')
    sessionStorage.removeItem('administrador')

    await fetch('/api/v1/usuarios/auth', {
        method: 'GET'
    })

    window.location.replace('iniciar-sesion')
}

const validarSesion = async () => {

    if (!sessionStorage.getItem('autenticado') || sessionStorage.getItem('autenticado') != 'true') {
        window.location.replace('iniciar-sesion')
    }
}

const validarRol = async () => {

    const tipoUsuario = sessionStorage.getItem('administrador')

    if (!tipoUsuario) {
        return window.location.replace('iniciar-sesion')
    }

    if (Number(tipoUsuario) === 1) {
        const enlaces =
            `
        <a href="calculos"><button>CÁLCULOS</button></a>
        <a href=""><button>CASOS</button></a>
        <a href="clientes"><button>CLIENTES</button></a>
        <a href="administrar-calculos"><button>ADMINISTRAR CÁLCULOS</button></a>
        <a href="administrar-usuarios"><button>ADMINISTRAR USUARIOS</button></a>
        <a><button id="cerrar-sesion"">CERRAR SESIÓN</button></a>
        `
        document.getElementById('enlaces').innerHTML = enlaces
    }
    else {
        const enlaces =
            `
        <a href="calculos"><button>CÁLCULOS</button></a>
        <a href=""><button>CASOS</button></a>
        <a href="clientes"><button>CLIENTES</button></a>
        <a><button id="cerrar-sesion"">CERRAR SESIÓN</button></a>
        `
        document.getElementById('enlaces').innerHTML = enlaces
    }
}

