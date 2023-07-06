import { Router } from "express";
const router = Router()
import {fileUpload,fileValidation} from '../../utils/multer.js'
import * as categoryController from './controller/category.js'



router.get('/', (req ,res)=>{
    res.status(200).json({message:"Category Module"})
})

router.post('/create',
categoryController.createCategory)




export default router