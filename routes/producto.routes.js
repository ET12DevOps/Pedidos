import express from 'express'

const router = express.Router()

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

router.get('/producto', (request, response) => {
    response.send(productos)
})

router.get('/producto/:id', (request, response) => {
    let producto = productos.find(x => x.productoId == request.params.id)
    response.send(producto)
})

router.post('/producto', (request, response) => {
    let producto = request.body;
    console.log(producto);
    productos.push(producto)
    response.send(productos)
})

router.delete('/producto/:id', (request, response) => {
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

export default router