const express = require('express')
const router = express.Router()
const { verificarJWT } = require('../middleware/autenticacion')
const { obtenerCasos } = require('../controladores/casos')

router.get('/', verificarJWT, obtenerCasos)


module.exports = router
