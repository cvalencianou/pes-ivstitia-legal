const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const Caso = require('../modelos/Caso')

const obtenerCasos = async (req, res) => {
    const usuarioId = req.user.id
    const caso = new Caso()

    const resultado = await caso.obtenerCasos(usuarioId)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `No existe ningún caso!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })

}

const crearCaso = async (req, res) => {
    const usuarioId = req.user.id
    const { nombre, despacho, descripcion, estado, tipoProceso, lugarEstadoProceso } = req.body

    if (!usuarioId || !nombre || !despacho || !descripcion || !estado || !tipoProceso || !lugarEstadoProceso) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof (usuarioId) !== 'number' || typeof (nombre, despacho, descripcion) !== 'string') {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    if (isNaN(estado) || isNaN(tipoProceso) || isNaN(lugarEstadoProceso)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS numeros!')
    }

    const caso = new Caso()

    if ((await caso.buscarPorNombre(usuarioId, nombre))[0].length === 1) {
        throw new httpError(StatusCodes.CONFLICT, 'YA EXISTE CASO')
    }

    if ((await caso.crearCaso(usuarioId, nombre, despacho, descripcion, estado, tipoProceso, lugarEstadoProceso)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `CASO CREADO`
        })
    }
}

const filtrarCasos = async (req, res) => {

    const usuarioId = req.user.id
    const datoCaso = req.query.datoCaso

    if (!usuarioId || !datoCaso) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS VALORES!')
    }

    const caso = new Caso()

    const resultado = await caso.filtrarCasos(usuarioId, datoCaso)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `${datoCaso} no coincide con ningún caso!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

module.exports = { obtenerCasos, crearCaso, filtrarCasos }