//Importa módulo Express
const express = require('express')
const app = express()
require('express-async-errors')
const rateLimit = require('express-rate-limit')
const helmet = require("helmet")
var cookieParser = require('cookie-parser')
const manejoErrores = require('./middleware/manejoErrores')
const usuarios = require('./rutas/usuarios')
const clientes = require('./rutas/clientes')
const registros = require('./rutas/registros')
const actos = require('./rutas/actos')
const casos = require('./rutas/casos')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

//Habilitar aplicacion detrás de proxy o balanceador de carga X-Forwarded-*
//app.set('trust proxy', 1)

// Middleware para asegurar headers http aplicación Express
app.use(helmet.crossOriginEmbedderPolicy())
app.use(helmet.crossOriginOpenerPolicy())
app.use(helmet.crossOriginResourcePolicy())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.originAgentCluster())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())
//Se comparten vistas con y sin extensión html
app.use(express.static('./vistas', {
    extensions: ['html']
}))
//Middleware para limitar ataques DoS o ataques fuerza bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next, options) => {
        throw new httpError(StatusCodes.TOO_MANY_REQUESTS, 'Ha excedido las solicitudes. Intente de nuevo en 15 minutos')
    }
})
app.use(limiter)
// Se hace parsing a objeto JSON de string
app.use(express.json())
//Se hace parsing a cookies firmadas
app.use(cookieParser(String(process.env.COOKIE_SECRET)))

//Rutas a los controladores
app.use('/api/v1/usuarios', usuarios)
app.use('/api/v1/registros', registros)
app.use('/api/v1/actos', actos)
app.use('/api/v1/clientes', clientes)
app.use('/api/v1/casos', casos)

//Ruta para cualquier otra no existente
app.use((req, res, next) => {
    res.status(404).sendFile('vistas/no-encontrado.html', { root: __dirname })
})

//Middleware para el manejo de errores y respuestas
app.use(manejoErrores)

module.exports = app