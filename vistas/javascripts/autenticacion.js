const validarRol = async () => {
    if (Number(sessionStorage.getItem('administrador')) === 1) {
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

const cerrarSesion = async () => {
    sessionStorage.removeItem('administrador')
    window.location.replace('index.html')
}