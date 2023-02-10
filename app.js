const express = require('express')
const app = express()
require('express-async-errors')
var cookieParser = require('cookie-parser')
const manejoErrores = require('./middleware/manejoErrores')
const usuarios = require('./rutas/usuarios')
const calculos = require('./rutas/calculos')
const clientes = require('./rutas/clientes')

app.use(express.json())
app.use(cookieParser(String(process.env.COOKIE_SECRET)))
app.use(express.static('./vistas'))

app.use('/api/v1/usuarios', usuarios)
app.use('/api/v1/calculos', calculos)
app.use('/api/v1/clientes', clientes)

app.use(manejoErrores)

module.exports = app