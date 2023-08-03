import { Router } from "express";
import { createProduct } from './controller/product.js';
import * as productController from './controller/product.js'
import { cloudUpload } from "../../utils/multer.js";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"product Module"})
})

router.post('/create',cloudUpload().fields([
    {name:"mainImage", maxCount:1},
    {name:"subImages", maxCount:5}
]),productController.createProduct)



export default router