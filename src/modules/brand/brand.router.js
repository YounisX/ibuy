import { Router } from "express";
import { cloudUpload, fileValidation } from "../../utils/multer.js";
import * as brandController from './controller/brand.js'
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Brand Module"})
})

router.post('/create',cloudUpload(fileValidation.image).single('image'),brandController.createBrand)




export default router