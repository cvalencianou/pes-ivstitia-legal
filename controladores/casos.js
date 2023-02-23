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

module.exports = { obtenerCasos }