const express = require('express')
const router = express.Router()
const { crearUsuario, iniciarSesion, cerrarSesion, obtenerUsuarios, actualizarUsuario } = require('../controladores/usuarios')
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

router.post('/', verificarJWT, verificarAdministrador, crearUsuario)
router.post('/auth', iniciarSesion)
router.get('/auth', cerrarSesion)
router.get('/', verificarJWT, verificarAdministrador, obtenerUsuarios)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarUsuario)

module.exports = router