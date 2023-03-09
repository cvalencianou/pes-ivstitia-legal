const Registro = require('../modelos/Registro')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

//Función para crear un nuevo registro
const crearRegistro = async (req, res) => {

    const { nombre } = req.body

    if (!nombre || nombre.length < 1 || nombre.length > 45) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const registro = new Registro()

    //Valida que nombre de registro no exista
    if ((await registro.buscarPorNombre(nombre))[0].length > 0) {
        throw new httpError(StatusCodes.CONFLICT, 'NOMBRE REGISTRO YA EXISTE')
    }

    if ((await registro.crear(nombre)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: 'REGISTRO CREADO'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'REGISTRO NO CREADO')
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
        throw new httpError(StatusCodes.NOT_FOUND, 'NO HAY REGISTROS')
    }
}

//Función para actualizar un registro
const actualizarRegistro = async (req, res) => {

    const { id } = req.params
    const { nombre } = req.body

    if (!id || isNaN(id) || !nombre || nombre.length < 1 || nombre.length > 45) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const registro = new Registro()

    //Valida que id de registro exista
    if ((await registro.buscarPorId(id))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'ID REGISTRO NO EXISTE')
    }

    const resultado = (await registro.buscarPorNombre(nombre))[0]

    //Valida que nombre de registro no exista
    if (resultado.length === 1 && resultado[0].id !== Number(id)) {
        throw new httpError(StatusCodes.CONFLICT, 'NOMBRE REGISTRO YA EXISTE')
    }

    if ((await registro.actualizarPorId(id, nombre)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'REGISTRO ACTUALIZADO'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'REGISTRO NO ACTUALIZADO')
    }
}

//Función para eliminar un registro
const eliminarRegistro = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const registro = new Registro()

    //Valida que registro a eliminar exista
    if ((await registro.buscarPorId(id))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'ID REGISTRO NO EXISTE')
    }

    if ((await registro.eliminarPorId(id)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'REGISTRO ELIMINADO'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'REGISTRO NO ELIMINADO')
    }
}

module.exports = { crearRegistro, obtenerRegistros, actualizarRegistro, eliminarRegistro }