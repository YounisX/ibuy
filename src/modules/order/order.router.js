import { Router } from "express";
const router = Router()

import * as orderController from './controller/order.js'
import { roles } from './../../middleware/auth.js';
import auth from './../../middleware/auth.js';








router.post('/',auth(Object.values(roles)), orderController.createOrder)
router.delete('/:orderId',auth(Object.values(roles)), orderController.cancelOrder)
router.patch('/:orderId/admin',auth(Object.values(roles)), orderController.updateOrderStatusByAdmin)


export default router