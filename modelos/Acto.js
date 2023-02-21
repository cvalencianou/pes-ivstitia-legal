const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Acto {

    id
    nombre

    async obtenerTodos() {
        return await executePreparedStatement('CALL actos_obtener_todos()', [])
    }
}

module.exports = Acto