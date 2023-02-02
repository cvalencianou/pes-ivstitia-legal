const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')
const router = express.Router()

router.get('/', verificarJWT, verificarAdministrador, (req, res) => {
    res.status(StatusCodes.OK).json({
        mensaje: `DATA DE USUARIO ${req.user.administrador}`
    })
})

module.exports = router