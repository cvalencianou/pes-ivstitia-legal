const Registro = require('../modelos/Registro')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

//Función para crear un nuevo registro
const crearRegistro = async (req, res) => {

    const { nombre } = req.body

    if (!nombre || nombre.length < 1 || nombre.length > 45) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar valores válidos')
    }

    const registro = new Registro()

    //Valida que nombre de registro no exista
    if ((await registro.buscarPorNombre(nombre))[0].length > 0) {
        throw new httpError(StatusCodes.CONFLICT, 'Nombre de registro ya existe')
    }

    if ((await registro.crear(nombre)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: 'Registro creado'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'Registro no creado')
    }
}

//Función para obtener lista de todos los registros
const obtenerRegistros = async (req, res) => {

    const registros = (await new Registro().obtenerTodos())[0]

    if (registros.length > 0) {
        res.status(StatusCodes.OK).json({
            mensaje: registros
        })
    }
    else {
        throw new httpError(StatusCodes.NOT_FOUND, 'No hay registros')
    }
}

//Función para actualizar un registro
const actualizarRegistro = async (req, res) => {

    const { id } = req.params
    const { nombre } = req.body

    if (!id || isNaN(id) || !nombre || nombre.length < 1 || nombre.length > 45) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar valores válidos')
    }

    const registro = new Registro()

    //Valida que id de registro exista
    if ((await registro.buscarPorId(id))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'Id de registro no existe')
    }

    const resultado = (await registro.buscarPorNombre(nombre))[0]

    //Valida que nombre de registro no exista
    if (resultado.length === 1 && resultado[0].id !== Number(id)) {
        throw new httpError(StatusCodes.CONFLICT, 'Nombre de registro ya existe')
    }

    if ((await registro.actualizarPorId(id, nombre)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'Registro actualizado'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'Registro no actualizado')
    }
}

//Función para eliminar un registro
const eliminarRegistro = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar valores válidos')
    }

    const registro = new Registro()

    //Valida que registro a eliminar exista
    if ((await registro.buscarPorId(id))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'Id de registro no existe')
    }

    if ((await registro.eliminarPorId(id)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'Registro eliminado'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'Registro no eliminado')
    }
}

module.exports = { crearRegistro, obtenerRegistros, actualizarRegistro, eliminarRegistro }