import { Router } from 'express'
import { leerProveedores } from '../controllers/proveedor.controller'

const router = Router()

router.get('/proveedor', leerProveedores)

export default router