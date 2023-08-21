import { Router } from 'express'
import { leerCategorias } from '../controllers/categoria.controller'

const router = Router()

router.get('/categoria', leerCategorias)

export default router