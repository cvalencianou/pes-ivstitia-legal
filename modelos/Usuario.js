const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Usuario {
    id
    correo
    contrasena
    administrador
    contrasenaConfigurada

    async buscarPorCorreo(correo) {
        return await executePreparedStatement('CALL usuarios_buscar_por_correo(?)', [correo])
    }

    async registrar(correo, contrasena) {
        return await executePreparedStatement('CALL usuarios_registrar(?,?)', [correo, contrasena])
    }

    async validarCredenciales(correo) {
        return await executePreparedStatement('CALL usuarios_validar_credenciales(?)', [correo])
    }

    async obtenerUsuarios() {
        return await executePreparedStatement('CALL usuarios_obtener_usuarios()', [])
    }

    async verificarAdministrador(id) {
        return await executePreparedStatement('CALL usuarios_verificar_administrador(?)', [id])
    }

    async buscarPorId(id) {
        return await executePreparedStatement('CALL usuarios_buscar_por_id(?)', [id])
    }

    async actualizar(id, correo, administrador) {
        return await executePreparedStatement('CALL usuarios_actualizar(?,?,?)', [id, correo, administrador])
    }

    async restablecerContrasena(id, contrasena) {
        return await executePreparedStatement('CALL usuarios_restablecer_contrasena(?,?)', [id, contrasena])
    }

    async cambiarContrasena(id, contrasenaNueva) {
        return await executePreparedStatement('CALL usuarios_cambiar_contrasena(?,?)', [id, contrasenaNueva])
    }

    async eliminarPorId(id) {
        return await executePreparedStatement('CALL usuarios_eliminar_por_id(?)', [id])
    }
}

module.exports = Usuario