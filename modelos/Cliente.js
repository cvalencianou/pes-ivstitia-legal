const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Cliente {

    async obtenerClientes(usuarioId) {
        return await executePreparedStatement('CALL obtener_clientes(?)', [usuarioId])
    }
    async filtro(usuarioId, datoCliente) {
        return await executePreparedStatement('CALL filtro_clientes(?,?)', [usuarioId, datoCliente])
    }
    async crearCliente(usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula) {
        return await executePreparedStatement('CALL crear_cliente(?,?,?,?,?,?,?,?)', [usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula])
    }
    async actualizarCliente(clienteId, usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula) {
        return await executePreparedStatement('CALL actualizar_cliente(?,?,?,?,?,?,?,?,?)', [clienteId, usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula])
    }
}
module.exports = Cliente