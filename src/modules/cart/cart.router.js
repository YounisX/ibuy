import { Router } from "express";
import * as cartController from './controller/cart.js'
import auth, { roles } from '../../middleware/auth.js'
const router = Router()






router.post('/', auth(Object.values(roles)), cartController.createCart)
router.patch('/delete', auth(Object.values(roles)), cartController.deleteItems)
router.put('/clear', auth(Object.values(roles)), cartController.clearCart)

export default router