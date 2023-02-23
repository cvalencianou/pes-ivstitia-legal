const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Caso {

    async obtenerCasos(usuarioId) {
        return await executePreparedStatement('CALL casos_obtener(?)', [usuarioId])
    }
}
module.exports = Caso
