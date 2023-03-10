const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Cliente {

    async obtenerClientes(usuarioId) {
        return await executePreparedStatement('CALL clientes_obtener(?)', [usuarioId])
    }
    async filtrarClientes(usuarioId, datoCliente) {
        return await executePreparedStatement('CALL clientes_filtrar(?,?)', [usuarioId, datoCliente])
    }
    async crearCliente(usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula) {
        return await executePreparedStatement('CALL cliente_crear(?,?,?,?,?,?,?,?)', [nombre, cedula, correo, , telefonoMovil, telefonoFisico, direccion, usuarioId, tipoCedula])
    }
    async buscarPorCedula(usuarioId, cedula) {
        return await executePreparedStatement('CALL cliente_buscar_por_cedula(?,?)', [usuarioId, cedula])
    }
    async buscarPorId(usuarioId, clienteId) {
        return await executePreparedStatement('CALL cliente_buscar_por_id(?,?)', [clienteId, usuarioId])
    }
    async actualizarCliente(clienteId, usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula) {
        return await executePreparedStatement('CALL clientes_actualizar(?,?,?,?,?,?,?,?,?)', [clienteId, usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula])
    }
    async eliminarCliente(clienteId, usuarioId) {
        return await executePreparedStatement('CALL cliente_eliminar_por_id(?,?)', [clienteId, usuarioId])
    }
}
module.exports = Cliente
