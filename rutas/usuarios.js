const express = require('express')
const router = express.Router()
const { crearUsuario, iniciarSesion } = require('../controladores/usuarios')
const { verificarJWT, verificarAdmin } = require('../middleware/autenticacion')

router.post('/', verificarJWT, verificarAdmin, crearUsuario)
router.post('/auth', iniciarSesion)


module.exports = router