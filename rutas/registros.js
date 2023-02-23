const express = require('express')
const router = express.Router()
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

const { crearRegistro, obtenerRegistros, actualizarRegistro, eliminarRegistro } = require('../controladores/registros')

router.post('/', verificarJWT, verificarAdministrador, crearRegistro)
router.get('/', verificarJWT, obtenerRegistros)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarRegistro)
router.delete('/:id', verificarJWT, verificarAdministrador, eliminarRegistro)

module.exports = router