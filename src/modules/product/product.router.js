import { Router } from "express";
import { createProduct } from './controller/product.js';
import * as productController from './controller/product.js'
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"product Module"})
})

router.post('/create',productController.createProduct)



export default router