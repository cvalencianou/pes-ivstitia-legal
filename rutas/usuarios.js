const express = require('express')
const router = express.Router()
const { crearUsuario, iniciarSesion } = require('../controladores/usuarios')
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

router.post('/', verificarJWT, verificarAdministrador, crearUsuario)
router.post('/auth', iniciarSesion)

module.exports = router