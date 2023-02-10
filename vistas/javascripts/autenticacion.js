window.onload = async () => {
    validarRol()
    validarSesion()
}

window.addEventListener('pageshow', () => {
    validarSesion()
})

const cerrarSesion = async () => {

    fetch('/api/v1/usuarios/auth', {
        method: 'GET'
    })

    sessionStorage.removeItem('administrador')
    window.location.replace('index.html')
}

const validarSesion = async () => {
    if (!sessionStorage.getItem('administrador')) {
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

