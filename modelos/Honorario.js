const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Honorario {

    id
    monto
    procentaje

    async obtenerMontos() {
        return await executePreparedStatement('CALL honorarios_obtener_montos()', [])
    }
}

module.exports = Honorario