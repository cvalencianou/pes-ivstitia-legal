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

//Función para apilar barra de navegación de manera responsive
barraResponsive = async () => {
    var navBar = document.getElementById("nav-bar");
    if (navBar.className === "nav-bar") {
        navBar.className += " responsive";
    } else {
        navBar.className = "nav-bar";
    }
}

//Función para cerrar sesión
const cerrarSesion = async () => {

    sessionStorage.removeItem('autenticado')
    sessionStorage.removeItem('administrador')

    await fetch('/api/v1/usuarios/auth', {
        method: 'GET'
    })

    window.location.replace('iniciar-sesion')
}

//Función para validar que la sesión del usuario es válida
const validarSesion = async () => {

    if (!sessionStorage.getItem('autenticado') || sessionStorage.getItem('autenticado') != 'true') {
        window.location.replace('iniciar-sesion')
    }
}

//Función para validar rol de usuario y mostrar opciones en navegación
const validarRol = async () => {

    const tipoUsuario = sessionStorage.getItem('administrador')

    if (!tipoUsuario) {
        return window.location.replace('iniciar-sesion')
    }

    if (Number(tipoUsuario) === 1) {
        const enlaces =
            `           
            <a href="inicio" class="logo">IL</a>
            <a href="calculos">CÁLCULOS</a>
            <a href="casos">CASOS</a>
            <a href="clientes">CLIENTES</a>
            <a href="administrar-calculos">ADMINISTRAR CÁLCULOS</a>
            <a href="administrar-usuarios">ADMINISTRAR USUARIOS</a>
            <a href="#" id="cerrar-sesion">CERRAR SESIÓN</a>
            <a href="javascript:void(0);" class="icon" onclick="barraResponsive()">
                <i class="fa fa-bars"></i>
            </a>
        `
        document.getElementById('nav-bar').innerHTML = enlaces
    }
    else {
        const enlaces =
            `
            <a href="inicio" class="logo">IL</a>
            <a href="calculos">CÁLCULOS</a>
            <a href="casos">CASOS</a>
            <a href="clientes">CLIENTES</a>
            <a href="#" id="cerrar-sesion">CERRAR SESIÓN</a>
            <a href="javascript:void(0);" class="icon" onclick="barraResponsive()">
                <i class="fa fa-bars"></i>
            </a>
        `
        document.getElementById('nav-bar').innerHTML = enlaces
    }
}

