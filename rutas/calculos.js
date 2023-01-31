const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { verificarJWT } = require('../middleware/autenticacion')
const router = express.Router()

router.get('/', verificarJWT, (req, res) => {
    res.status(StatusCodes.OK).json({
        mensaje: `DATA DE USUARIO ${req.user.id}`
    })
})

module.exports = router