const express = require('express')
const router = express.Router()
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

const { crearRegistro, obtenerRegistros } = require('../controladores/registros')

router.post('/', verificarJWT, verificarAdministrador, crearRegistro)
router.get('/', verificarJWT, obtenerRegistros)

module.exports = router