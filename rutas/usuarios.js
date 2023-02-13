const express = require('express')
const router = express.Router()
const { crearUsuario, iniciarSesion, cerrarSesion, obtenerUsuarios, actualizarUsuario, restablecerContrasena, cambiarContrasena } = require('../controladores/usuarios')
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

router.post('/auth', iniciarSesion)
router.get('/auth', cerrarSesion)
router.post('/auth/restablecer', restablecerContrasena)
router.put('/auth', cambiarContrasena)
router.get('/', verificarJWT, verificarAdministrador, obtenerUsuarios)
router.post('/', verificarJWT, verificarAdministrador, crearUsuario)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarUsuario)

module.exports = router