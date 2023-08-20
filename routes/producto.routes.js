import { Router } from 'express'
import { leerProductos, leerProducto, crearProducto, borrarProducto } from '../controllers/producto.controller'

const router = Router()

router.get('/producto', leerProductos)

router.get('/producto/:id', leerProducto)

router.post('/producto', crearProducto)

router.delete('/producto/:id', borrarProducto)

export default router