const Registro = require('../modelos/Registro')
const Acto = require('../modelos/Acto');
const { StatusCodes } = require('http-status-codes');

const obtenerRegistros = async (req, res) => {

    const registro = new Registro();

    const resultado = await registro.obtenerTodos()

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const obtenerActosPorIdRegistro = async (req, res) => {

    const { id } = req.params

    const acto = new Acto()

    const resultado = await acto.obtenerPorIdRegistro(id)

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const realizarCalculo = async (req, res) => {

    const { acto } = req.params
    const { monto } = req.body

    console.log(acto + ' ' + monto)
}

module.exports = { obtenerRegistros, obtenerActosPorIdRegistro, realizarCalculo }