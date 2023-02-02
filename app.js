const express = require('express')
const app = express()
require('express-async-errors')
var cookieParser = require('cookie-parser')
const manejoErrores = require('./middleware/manejoErrores')
const usuarios = require('./rutas/usuarios')
const calculos = require('./rutas/calculos')

app.use(cookieParser('secret'))
app.use(express.json())
app.use(express.static('./vistas'))

app.use('/api/v1/usuarios', usuarios)
app.use('/api/v1/calculos', calculos)

app.use(manejoErrores)

module.exports = app