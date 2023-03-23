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

    async obtenerClientePorId(usuarioId, clienteId) {
        return await executePreparedStatement('CALL cliente_buscar_por_id(?,?)', [clienteId, usuarioId])
    }

    async actualizarCliente(clienteId, usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula) {
        return await executePreparedStatement('CALL clientes_actualizar(?,?,?,?,?,?,?,?,?)', [clienteId, usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula])
    }

    async eliminarCliente(clienteId, usuarioId) {
        return await executePreparedStatement('CALL cliente_eliminar_por_id(?,?)', [clienteId, usuarioId])
    }

    async obtenerClientesPorIdCaso(casoId) {
        return await executePreparedStatement('CALL casos_obtener_clientes(?)', [casoId])
    }

    async agregarClientePorCasoId(casoId, clienteId) {
        return await executePreparedStatement('CALL casos_agregar_clientes(?,?)', [clienteId, casoId])
    }

    async eliminarClientePorCasoId(casoId, clienteId) {
        return await executePreparedStatement('CALL casos_eliminar_cliente(?,?)', [casoId, clienteId])
    }
}
module.exports = Cliente
