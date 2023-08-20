import express, { json } from 'express'
import morgan from 'morgan'

require('dotenv').config()

const port = process.env.PORT || 3000
const app = express()

app.use(json())
app.use(morgan('dev'))

let productos = [
    {
        "productoId" : 1, 
        "proveedorId": 10,
        "categoriaId": 100,
        "descripcion": "ATUN",
        "precioUnitario": 500,
        "existencia": 50
    }
]

app.get('/producto', (request, response) => {
    response.send(productos)
})

app.get('/producto/:id', (request, response) => {
    let producto = productos.find(x => x.productoId == request.params.id)
    response.send(producto)
})

app.post('/producto', (request, response) => {
    let producto = request.body;
    console.log(producto);
    productos.push(producto)
    response.send(productos)
})

app.delete('/producto/:id', (request, response) => {
    let idProducto = request.params.id
    let producto = productos.find(x => x.productoId == idProducto)
    console.log(producto)

    if (producto == null) {
        response.status(404).send("No se encuentra el producto")
        return
    }
    let indice = productos.indexOf(producto)
    productos.splice(indice, 1)
    response.send(productos)
})

app.listen(port)