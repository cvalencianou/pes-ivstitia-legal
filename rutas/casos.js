const express = require('express')
const router = express.Router()
const { verificarJWT } = require('../middleware/autenticacion')
const { obtenerCasos, crearCaso, filtrarCasos } = require('../controladores/casos')

router.get('/', verificarJWT, obtenerCasos)
router.post('/', verificarJWT, crearCaso)
router.get('/filtro', verificarJWT, filtrarCasos)

module.exports = router
