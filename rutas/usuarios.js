const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const express = require('express')
const router = express.Router()
//Importa controladores para que sean manejados por endpoints
const { crearUsuario, iniciarSesion, cerrarSesion, obtenerUsuarios, actualizarUsuario, restablecerContrasena, cambiarContrasena, eliminarUsuario } = require('../controladores/usuarios')
//Importa middleware autenticación
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler: (req, res, next, options) => {
        throw new httpError(StatusCodes.TOO_MANY_REQUESTS, 'HA EXCEDIDO LAS SOLICITUDES. INTENTE DE NUEVO EN 15 MINUTOS')
    }
})

//Rutas de actos hacia controladores, sew verifica rol de administrador para algunas y en todas se valida token JWT válido
router.post('/auth', limiter, iniciarSesion)
router.get('/auth', cerrarSesion)
router.post('/auth/restablecer', limiter, restablecerContrasena)
router.put('/auth', limiter, cambiarContrasena)
router.get('/', verificarJWT, verificarAdministrador, obtenerUsuarios)
router.post('/', verificarJWT, verificarAdministrador, crearUsuario)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarUsuario)
router.delete('/:id', verificarJWT, verificarAdministrador, eliminarUsuario)

module.exports = router