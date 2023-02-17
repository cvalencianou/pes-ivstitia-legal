const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Cliente {

    async obtenerClientes(usuarioId) {
        return await executePreparedStatement('CALL clientes_obtener(?)', [usuarioId])
    }
    async filtrarClientes(usuarioId, datoCliente) {
        return await executePreparedStatement('CALL filtrar_clientes(?,?)', [usuarioId, datoCliente])
    }
    async crearCliente(usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula) {
        return await executePreparedStatement('CALL cliente_crear(?,?,?,?,?,?,?,?)', [nombre, cedula, correo, numeroFisico, numeroMovil, direccion, usuarioId, tipoCedula])
    }
    async actualizarCliente(clienteId, usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula) {
        return await executePreparedStatement('CALL actualizar_cliente(?,?,?,?,?,?,?,?,?)', [clienteId, usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula])
    }
    async buscarPorCedula(usuarioId, cedula) {
        return await executePreparedStatement('CALL cliente_buscar_por_cedula(?,?)', [usuarioId, cedula])
    }
}
module.exports = Cliente