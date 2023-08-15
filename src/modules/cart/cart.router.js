import { Router } from "express";
import { createCart } from './controller/cart.js';
import * as cartController from './controller/cart.js'
import auth, { roles } from '../../middleware/auth.js'
const router = Router()






router.post('/', auth(roles['Admin']), cartController.createCart)

export default router