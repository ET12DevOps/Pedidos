const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './routes/producto.routes.js',
    './routes/proveedor.routes.js',
    './routes/categoria.routes.js'
]

swaggerAutogen(outputFile, endpointsFiles)