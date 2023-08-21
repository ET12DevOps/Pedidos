import pool from '../postgres.configuration'

export const leerProveedores = async (request, response) => {
    pool.query('SELECT * FROM proveedor ORDER BY proveedorId ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}