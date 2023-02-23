const Registro = require('../modelos/Registro')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

const crearRegistro = async (req, res) => {

    const { nombre } = req.body

    new Registro().crear(nombre)

    res.status(StatusCodes.CREATED).json({
        mensaje: 'REGISTRO CREADO'
    })
}

const obtenerRegistros = async (req, res) => {

    const resultado = await new Registro().obtenerTodos()

    if (resultado[0].length > 0) {
        res.status(StatusCodes.OK).json({
            mensaje: resultado[0]
        })
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({
            mensaje: 'NO HAY REGISTROS'
        })
    }
}

const actualizarRegistro = async (req, res) => {
    const { id } = req.params

    const { nombre } = req.body

    if (!id || !nombre) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const registro = new Registro()



    if ((await registro.actualizarPorId(id, nombre)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'REGISTRO ACTUALIZADO'
        })
    }
    else {
        res.status(StatusCodes.CONFLICT).json({
            mensaje: 'REGISTRO NO ACTUALIZADO'
        })
    }
}


const eliminarRegistro = async (req, res) => {
    const { id } = req.params

    if (!id) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }
    const registro = new Registro()


    if ((await registro.eliminarPorId(id)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'REGISTRO ELIMINADO'
        })
    }
    else {
        res.status(StatusCodes.CONFLICT).json({
            mensaje: 'REGISTRO NO ELIMINADO'
        })
    }
}

module.exports = { crearRegistro, obtenerRegistros, actualizarRegistro, eliminarRegistro }