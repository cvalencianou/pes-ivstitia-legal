const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class TributosHonorarios {

    id
    registro
    agrario
    fiscal
    archivo
    abogado
    municipal
    parquesNacionales
    faunaSilvestre
    cruzRoja
    traspaso
    honorarios
    adicionalPlacas
    idActo

    obtenerPorIdActo = async (idActo) => {
        return await executePreparedStatement('CALL tributos_honorarios_obtener_por_id_acto(?)', [idActo])
    }

    crearPorIdActo = async (idActo, tributosHonorarios) => {

        const registro = tributosHonorarios.registro || null
        const agrario = tributosHonorarios.agrario || null
        const fiscal = tributosHonorarios.fiscal || null
        const archivo = tributosHonorarios.archivo || null
        const abogado = tributosHonorarios.abogado || null
        const municipal = tributosHonorarios.municipal || null
        const parquesNacionales = tributosHonorarios.parquesNacionales || null
        const faunaSilvestre = tributosHonorarios.faunaSilvestre || null
        const cruzRoja = tributosHonorarios.cruzRoja || null
        const traspaso = tributosHonorarios.traspaso || null
        const honorarios = tributosHonorarios.honorarios || null
        const adicionalPlacas = tributosHonorarios.adicionalPlacas || null

        return await executePreparedStatement(
            'CALL tributos_honorarios_crear_por_id_acto(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [idActo, registro, agrario, fiscal, archivo, abogado, municipal, parquesNacionales,
                faunaSilvestre, cruzRoja, traspaso, honorarios, adicionalPlacas])
    }

    actualizarPorIdActo = async (idActo, tributosHonorarios) => {

        const registro = tributosHonorarios.registro || null
        const agrario = tributosHonorarios.agrario || null
        const fiscal = tributosHonorarios.fiscal || null
        const archivo = tributosHonorarios.archivo || null
        const abogado = tributosHonorarios.abogado || null
        const municipal = tributosHonorarios.municipal || null
        const parquesNacionales = tributosHonorarios.parquesNacionales || null
        const faunaSilvestre = tributosHonorarios.faunaSilvestre || null
        const cruzRoja = tributosHonorarios.cruzRoja || null
        const traspaso = tributosHonorarios.traspaso || null
        const honorarios = tributosHonorarios.honorarios || null
        const adicionalPlacas = tributosHonorarios.adicionalPlacas || null


        return await executePreparedStatement(
            'CALL tributos_honorarios_actualizar_por_id_acto(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [idActo, registro, agrario, fiscal, archivo, abogado, municipal, parquesNacionales,
                faunaSilvestre, cruzRoja, traspaso, honorarios, adicionalPlacas])
    }

    eliminarPorIdActo = async (idActo) => {
        return await executePreparedStatement('CALL tributos_honorarios_eliminar_por_id_acto(?)', [idActo])
    }

}

module.exports = TributosHonorarios