const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Caso {

    async obtenerCasos(usuarioId) {
        return await executePreparedStatement('CALL casos_obtener(?)', [usuarioId])
    }

    async crearCaso(usuarioId, nombre, despacho, descripcion, estado, tipoProceso, lugarEstadoProceso) {
        return await executePreparedStatement('CALL casos_crear(?,?,?,?,?,?,?)', [nombre, despacho, descripcion, tipoProceso, estado, lugarEstadoProceso, usuarioId])
    }

    async buscarPorNombre(usuarioId, nombre) {
        return await executePreparedStatement('CALL caso_buscar_por_nombre(?,?)', [usuarioId, nombre])
    }

}
module.exports = Caso
