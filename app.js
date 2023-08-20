//importa dependencia de la biblioteca express
import express, { json } from 'express'
//importa dependencia de la biblioteca morgan
import morgan from 'morgan'
//importa archivo .env - variables de entorno
require('dotenv').config()
//importar el archivo usuarioRoutes del archivo producto.routes.js
import productoRoutes from './routes/producto.routes'

//configuracion de swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

//crea la aplicacion 
const app = express()

//define un puerto en que va a escuchar pedidos
const port = process.env.PORT || 3000

//lee el body en formato json
app.use(json())

//imprime las acciones hacia cada endopoint en la terminal
app.use(morgan('dev'))

//endpoints
app.use(productoRoutes)
//endpoint para documentacion swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port)