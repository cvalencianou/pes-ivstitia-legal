const { executePreparedStatement } = require('../utilidades/baseDeDatos')

//Clase de usuario con atributos y métodos identicos a tablas y procedimientos en SQL
class Usuario {

    id
    correo
    contrasena
    administrador
    contrasenaConfigurada

    buscarPorCorreo = async (correo) => {
        return await executePreparedStatement('CALL usuarios_buscar_por_correo(?)', [correo])
    }

    registrar = async (correo, contrasena) => {
        return await executePreparedStatement('CALL usuarios_registrar(?,?)', [correo, contrasena])
    }

    validarCredenciales = async (correo) => {
        return await executePreparedStatement('CALL usuarios_validar_credenciales(?)', [correo])
    }

    obtenerTodos = async () => {
        return await executePreparedStatement('CALL usuarios_obtener_todos()', [])
    }

    verificarAdministrador = async (id) => {
        return await executePreparedStatement('CALL usuarios_verificar_administrador(?)', [id])
    }

    buscarPorId = async (id) => {
        return await executePreparedStatement('CALL usuarios_buscar_por_id(?)', [id])
    }

    actualizar = async (id, correo, administrador) => {
        return await executePreparedStatement('CALL usuarios_actualizar(?,?,?)', [id, correo, administrador])
    }

    restablecerContrasena = async (id, contrasena) => {
        return await executePreparedStatement('CALL usuarios_restablecer_contrasena(?,?)', [id, contrasena])
    }

    cambiarContrasena = async (id, contrasenaNueva) => {
        return await executePreparedStatement('CALL usuarios_cambiar_contrasena(?,?)', [id, contrasenaNueva])
    }

    eliminarPorId = async (id) => {
        return await executePreparedStatement('CALL usuarios_eliminar_por_id(?)', [id])
    }
}

module.exports = Usuario