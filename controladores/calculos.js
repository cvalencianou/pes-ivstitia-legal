const Registro = require('../modelos/Registro')
const Acto = require('../modelos/Acto')
const TributoHonorario = require('../modelos/TributoHonorario')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

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

const obtenerActosPorIdRegistro = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const resultado = await new Acto().obtenerPorIdRegistro(id)

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

const realizarCalculo = async (req, res) => {

    const { acto } = req.params
    const { montoConsulta } = req.body

    if (!acto || isNaN(acto) || !montoConsulta || isNaN(montoConsulta)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    res.status(StatusCodes.OK).json({
        mensaje: await new TributoHonorario().realizarCalculos(acto, montoConsulta)
    })
}


module.exports = { obtenerRegistros, obtenerActosPorIdRegistro, realizarCalculo }