import { Router } from "express";
import { createCart } from './controller/cart.js';
import * as cartController from './controller/cart.js'
const router = Router()






router.post('/',cartController.createCart)

export default router