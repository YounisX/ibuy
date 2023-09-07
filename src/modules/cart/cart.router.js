import { Router } from "express";
import { createCart } from './controller/cart.js';
import * as cartController from './controller/cart.js'
import auth, { roles } from '../../middleware/auth.js'
const router = Router()






router.post('/', auth(Object.values(roles)), cartController.createCart)
router.delete('/select', auth(Object.values(roles)), cartController.deleteItems)
router.put('/clear', auth(Object.values(roles)), cartController.clearCart)

export default router