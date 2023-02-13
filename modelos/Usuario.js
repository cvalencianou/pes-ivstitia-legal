const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Usuario {
    id
    correo
    contrasena
    administrador

    async buscarPorCorreo(correo) {
        return await executePreparedStatement('CALL usuarios_buscar_por_correo(?)', [correo])
    }

    async registrar(correo, contrasena) {
        return await executePreparedStatement('CALL usuarios_registrar(?,?)', [correo, contrasena])
    }

    async iniciarSesion(correo) {
        return await executePreparedStatement('CALL usuarios_iniciar_sesion(?)', [correo])
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
}

module.exports = Usuario