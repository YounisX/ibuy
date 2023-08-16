import { Router } from "express";
const router = Router()

import * as orderController from './controller/order.js'




router.get('/', (req ,res)=>{
    res.status(200).json({message:"order Module"})
})

router.post('/create', orderController.createOrder)


export default router