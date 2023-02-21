const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Registro {
    
    id
    nombre

    async obtenerTodos() {
        return await executePreparedStatement('CALL registros_obtener_todos()', [])
    }
}

module.exports = Registro