import pool from '../postgres.configuration'

export const leerProductos = async (request, response) => {
    pool.query('SELECT * FROM producto ORDER BY productoId ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

export const leerProducto = async (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM producto WHERE productoid = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

export const crearProducto = async (request, response) => {
    const { productoid, proveedorid, categoriaid, descripcion, preciounit, existencia } = request.body

    pool.query('INSERT INTO producto (productoid, proveedorid, categoriaid, descripcion, preciounit, existencia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [productoid, proveedorid, categoriaid, descripcion, preciounit, existencia], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

export const borrarProducto = async (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM producto WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Producto eliminado con ID: ${id}`)
    })
}
