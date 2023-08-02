import { Router } from "express";
import { cloudUpload, fileValidation } from "../../utils/multer.js";
import * as brandController from './controller/brand.js'
import * as validators from '../brand/brand.validation.js';
import { validation } from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import { endPoint } from "./brand.endPoint.js";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Brand Module"})
})

router.post('/create',auth(endPoint.create),cloudUpload().single('image'),brandController.createBrand)

router.put('/update/:brandId',auth(endPoint.update),
  cloudUpload().single('image'),
  validation(validators.updateBrand),
  brandController.updateBrand
);
 router.get('/:brandId',
  brandController.getBrand
);


export default router