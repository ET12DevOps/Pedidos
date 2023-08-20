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

export const leerProductos = async (request, response) => {
    try {
        response.send(productos)
    } catch (err) {
        response.status(500).send(err)
    }
}

export const leerProducto = async (request, response) => {
    let producto = productos.find(x => x.productoId == request.params.id)
    response.send(producto)
}

export const crearProducto = async (request, response) => {
    let producto = request.body;
    console.log(producto);
    productos.push(producto)
    response.send(productos)
}

export const borrarProducto = async (request, response) => {
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
}
