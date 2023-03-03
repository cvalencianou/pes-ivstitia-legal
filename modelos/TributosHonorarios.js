const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class TributosHonorarios {

    obtenerPorIdActo = async (acto) => {
        return await executePreparedStatement('CALL tributos_honorarios_obtener_por_id_acto(?)', [acto])
    }

    actualizarPorIdActo = async (idActo, registro, agrario, fiscal, archivo,
        abogado, municipal, parquesNacionales, faunaSilvestre, cruzRoja, traspaso, honorarios,
        adicionalPlacas) => {
        return await executePreparedStatement(
            'CALL tributos_honorarios_actualizar_por_id_acto(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [idActo, registro, agrario, fiscal, archivo, abogado, municipal, parquesNacionales,
                faunaSilvestre, cruzRoja, traspaso, honorarios, adicionalPlacas])
    }

}

module.exports = TributosHonorarios