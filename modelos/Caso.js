const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Caso {

    async obtenerCasos(usuarioId) {
        return await executePreparedStatement('CALL casos_obtener(?)', [usuarioId])
    }

    async crearCaso(usuarioId, nombre, despacho, descripcion, estado, tipoProceso) {
        return await executePreparedStatement('CALL casos_crear(?,?,?,?,?,?)', [nombre, despacho, descripcion, tipoProceso, estado, usuarioId])
    }

    async buscarPorNombre(usuarioId, nombre) {
        return await executePreparedStatement('CALL caso_buscar_por_nombre(?,?)', [usuarioId, nombre])
    }

    async filtrarCasos(usuarioId, datoCaso) {
        return await executePreparedStatement('CALL casos_filtrar(?,?)', [usuarioId, datoCaso])
    }

    async actualizarCaso(casoId, usuarioId, nombre, despacho, descripcion, estado, tipoProceso) {
        return await executePreparedStatement('CALL caso_actualizar(?,?,?,?,?,?,?)', [casoId, nombre, despacho, descripcion, tipoProceso, estado, usuarioId])
    }

    async eliminarCaso(casoId, usuarioId) {
        return await executePreparedStatement('CALL casos_eliminar_por_id(?,?)', [casoId, usuarioId])
    }

    async buscarPorIdCaso(casoId, usuarioId) {
        return await executePreparedStatement('CALL casos_buscar_por_id(?,?)', [casoId, usuarioId])
    }

    async obtenerCaso(casoId, usuarioId) {
        return await executePreparedStatement('CALL casos_obtener_por_id(?,?)', [casoId, usuarioId])
    }

}
module.exports = Caso
