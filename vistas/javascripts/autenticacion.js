window.onload = async () => {
    validarRol()
}

window.onpageshow = async () => {
    validarSesion()
}

window.onchange = async () => {
    validarSesion()
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

    window.location.replace('iniciar-sesion.html')
}

const validarSesion = async () => {

    if (!sessionStorage.getItem('autenticado') || sessionStorage.getItem('autenticado') != 'true') {
        window.location.replace('iniciar-sesion.html')
    }
}

const validarRol = async () => {

    const tipoUsuario = sessionStorage.getItem('administrador')

    if (!tipoUsuario) {
        return window.location.replace('iniciar-sesion.html')
    }

    if (Number(tipoUsuario) === 1) {
        const enlaces =
            `
        <a href="calculos.html"><button>CÁLCULOS</button></a>
        <a href=""><button>CASOS</button></a>
        <a href=""><button>CLIENTES</button></a>
        <a href="administrar-calculos.html"><button>ADMINISTRAR CÁLCULOS</button></a>
        <a href="administrar-usuarios.html"><button>ADMINISTRAR USUARIOS</button></a>
        <a><button onclick="cerrarSesion()">CERRAR SESIÓN</button></a>
        `
        document.getElementById('enlaces').innerHTML = enlaces
    }
    else {
        const enlaces =
            `
        <a href="calculos.html"><button>CÁLCULOS</button></a>
        <a href=""><button>CASOS</button></a>
        <a href=""><button>CLIENTES</button></a>
        <a><button onclick="cerrarSesion()">CERRAR SESIÓN</button></a>
        `
        document.getElementById('enlaces').innerHTML = enlaces
    }
}

