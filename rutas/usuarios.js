const express = require('express')
const router = express.Router()
const { crearUsuario, iniciarSesion, cerrarSesion } = require('../controladores/usuarios')
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

router.post('/', verificarJWT, verificarAdministrador, crearUsuario)
router.post('/auth', iniciarSesion)
router.get('/auth', cerrarSesion)

module.exports = router