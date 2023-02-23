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

module.exports = { crearRegistro, obtenerRegistros }