const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class NotaCaso {

    async obtenerNotasPorIdCaso(casoId){
        return await executePreparedStatement('CALL casos_obtener_notas(?)', [casoId])
    }

    async agregarNota(casoId, nota){
        return await executePreparedStatement('CALL casos_agregar_notas(?,?)', [casoId, nota])
    }

    async eliminarNota(casoId, notaId){
        return await executePreparedStatement('CALL casos_eliminar_nota(?,?)', [casoId, notaId])
    }

}

module.exports = NotaCaso