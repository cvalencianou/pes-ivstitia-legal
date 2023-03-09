const { executePreparedStatement } = require('../utilidades/baseDeDatos')

//Clase de registro con atributos y métodos identicos a tablas y procedimientos en SQL
class Registro {

    id
    nombre

    crear = async (nombre) => {
        return await executePreparedStatement('CALL registros_crear(?)', [nombre])
    }

    obtenerTodos = async () => {
        return await executePreparedStatement('CALL registros_obtener_todos()', [])
    }

    actualizarPorId = async (id, nombre) => {
        return await executePreparedStatement('CALL registros_actualizar_por_id(?,?)', [id, nombre])
    }

    eliminarPorId = async (id) => {
        return await executePreparedStatement('CALL registros_eliminar_por_id(?)', [id])
    }

    buscarPorNombre = async (nombre) => {
        return await executePreparedStatement('CALL registros_buscar_por_nombre(?)', [nombre])
    }

    buscarPorId = async (id) => {
        return await executePreparedStatement('CALL registros_buscar_por_id(?)', [id])
    }
}

module.exports = Registro