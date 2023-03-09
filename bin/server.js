//Se importan módulos Node.js
const https = require('https')
const fs = require('fs')
const path = require('path')
//Se importa aplicación Express
const app = require('../app')
//Se importa archivo .env con variables de ambiente
require('dotenv').config()

//Se leen archivos de certificado web
const ssl = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
}

//Se crea instancia de servidor web https
https.createServer(ssl, app).listen(process.env.SERVER_PORT, () => {
    console.log(`Server Up ${process.env.SERVER_PORT}`)
})