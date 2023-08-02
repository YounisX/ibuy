import { Router } from "express";
import { cloudUpload, fileValidation } from "../../utils/multer.js";
import * as brandController from './controller/brand.js'
import * as validators from '../brand/brand.validation.js';
import { validation } from "../../middleware/validation.js";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Brand Module"})
})

router.post('/create',auth(),cloudUpload().single('image'),brandController.createBrand)

router.put('/:brandId',
  cloudUpload().single('image'),
  validation(validators.updateBrand),
  brandController.updateBrand
);
 router.get('/:brandId',
  brandController.getBrand
);


export default router