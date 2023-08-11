import { Router } from "express";
const router = Router({mergeParams:true})
import * as subCategoryController from './controller/subCategory.js'
import { cloudUpload, fileValidation } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from '../subcategory/subcategory.validation.js'

router.get('/', (req,res)=>{
res.status(200).json({message:"SubCategory Module"})
})

router.post('/create/:categoryId',
cloudUpload().single('image'),validation(validators.createsubCategory),
subCategoryController.createsubCategory)

router.put('/:subCategoryId',
cloudUpload().single('image'),
validation(validators.updatesubCategory),
subCategoryController.updatesubCategory
)
router.get('/:subCategoryId',
subCategoryController.getsubCategory);

export default router