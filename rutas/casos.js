const express = require('express')
const router = express.Router()
const { verificarJWT } = require('../middleware/autenticacion')
const { obtenerCasos, crearCaso } = require('../controladores/casos')

router.get('/', verificarJWT, obtenerCasos)
router.post('/', verificarJWT, crearCaso)

module.exports = router
