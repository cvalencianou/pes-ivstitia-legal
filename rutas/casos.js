const express = require('express')
const router = express.Router()
const { verificarJWT } = require('../middleware/autenticacion')
const { obtenerCasos, crearCaso, filtrarCasos, actualizarCaso, eliminarCaso } = require('../controladores/casos')

router.get('/', verificarJWT, obtenerCasos)
router.get('/filtro', verificarJWT, filtrarCasos)
router.post('/', verificarJWT, crearCaso)
router.put('/', verificarJWT, actualizarCaso)
router.delete('/', verificarJWT, eliminarCaso)

module.exports = router
