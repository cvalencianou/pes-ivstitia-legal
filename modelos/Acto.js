const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Acto {

    id
    nombre

    async obtenerPorIdRegistro(id) {
        return await executePreparedStatement('CALL actos_obtener_por_id_registro(?)', [id])
    }
}

module.exports = Acto