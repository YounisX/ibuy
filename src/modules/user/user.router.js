import { Router } from "express";
import *as authController from '../user/controller/user.js'
import { validation } from "../../middleware/validation.js";
const router = Router()
import * as validators from './user.validation.js'



router.get('/', (req ,res)=>{
    res.status(200).json({message:"User Module"})
})

router.patch('/forgotPassword',validation(validators.forgotPassword),authController.sendCode);
router.patch('/resetPassword',authController.resetPassword);



export default router