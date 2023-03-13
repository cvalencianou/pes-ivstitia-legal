//Importa módulo Express
const express = require('express')
const app = express()
require('express-async-errors')
var cookieParser = require('cookie-parser')
const manejoErrores = require('./middleware/manejoErrores')
const usuarios = require('./rutas/usuarios')
const clientes = require('./rutas/clientes')
const registros = require('./rutas/registros')
const actos = require('./rutas/actos')
const casos = require('./rutas/casos')

// Se hace parsing a objeto JSON de string
app.use(express.json())
//Se hace parsing a cookies firmadas
app.use(cookieParser(String(process.env.COOKIE_SECRET)))
//Se comparten vistas con y sin extensión html
app.use(express.static('./vistas', {
    extensions: ['html']
}))

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