const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Registro {

    id
    nombre

    crear = async (nombre) => {
        return await executePreparedStatement('CALL registros_crear(?)', [nombre])
    }

    obtenerTodos = async () => {
        return await executePreparedStatement('CALL registros_obtener_todos()', [])
    }
}

module.exports = Registro