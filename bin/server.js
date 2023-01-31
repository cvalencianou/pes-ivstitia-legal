const https = require('https')
const fs = require('fs')
const path = require('path')
const app = require('../app')
require('dotenv').config()

const ssl = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
}

https.createServer(ssl, app).listen(process.env.SERVER_PORT, () => {
    console.log(`Server Up ${process.env.SERVER_PORT}`)
})