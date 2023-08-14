import { Router } from "express";
import { createProduct } from './controller/product.js';
import * as productController from './controller/product.js'
import { cloudUpload } from "../../utils/multer.js";
import auth, { roles } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './product.validation.js'
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"product Module"})
})

router.post('/create', 
auth(['Admin']),cloudUpload().fields([
    {name:"mainImage", maxCount:1},
    {name:"subImages", maxCount:5}
]),
validation(validators.createProduct),
productController.createProduct)


router.put('/:productId', 
auth(['Admin']),cloudUpload().fields([
    {name:"mainImage", maxCount:1},
    {name:"subImages", maxCount:5}
]),
validation(validators.updateCategory),
productController.updateCategory)


export default router