const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Tributo {

    id
    registro
    agrario
    fiscal
    archivo
    abogado
    municipal
    traspaso
    idActo

    async obtenerTributosPorIdActo(id) {
        return await executePreparedStatement('CALL tributos_obtener_por_id_acto(?)', [id])
    }
}

module.exports = Tributo