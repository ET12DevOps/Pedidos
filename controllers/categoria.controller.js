import pool from '../postgres.configuration'

export const leerCategorias = async (request, response) => {
    pool.query('SELECT * FROM categoria ORDER BY categoriaId ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
