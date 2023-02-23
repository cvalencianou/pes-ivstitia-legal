const express = require('express')
const app = express()
require('express-async-errors')
var cookieParser = require('cookie-parser')
const manejoErrores = require('./middleware/manejoErrores')
const usuarios = require('./rutas/usuarios')
const clientes = require('./rutas/clientes')
<<<<<<< HEAD
const registros = require('./rutas/registros')
const actos = require('./rutas/actos')
=======
const casos = require('./rutas/casos')
>>>>>>> e96b1733030aa4b26a9889b6b50db563ea985a7b

app.use(express.json())
app.use(cookieParser(String(process.env.COOKIE_SECRET)))
app.use(express.static('./vistas', {
    extensions: ['html']
}))

app.use('/api/v1/usuarios', usuarios)
app.use('/api/v1/registros', registros)
app.use('/api/v1/actos', actos)
app.use('/api/v1/clientes', clientes)
app.use('/api/v1/casos', casos)

app.use(manejoErrores)

module.exports = app