const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Usuario {
    id
    correo
    contrasena
    administrador
    activo

    async buscarPorCorreo(correo) {
        return await executePreparedStatement('CALL usuarios_buscar_por_correo(?)', [correo])
    }

    async registrar(correo, contrasena) {
        return await executePreparedStatement('CALL usuarios_registrar(?,?)', [correo, contrasena])
    }

    async iniciarSesion(correo) {
        return await executePreparedStatement('CALL usuarios_iniciar_sesion(?)', [correo])
    }
}

module.exports = Usuario