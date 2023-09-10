const express = require('express')
const app = express()

const routes = require('./routes')

// // chay khi khong can ket noi mongodb
routes(app, express).listen(80, () => // console.log('Listening on port 80'))
