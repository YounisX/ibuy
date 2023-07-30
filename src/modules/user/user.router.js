import { Router } from "express";
import *as authController from '../user/controller/user.js'
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"User Module"})
})

router.patch('/forgotPassword',authController.sendCode);
router.patch('/resetPassword',authController.resetPassword);



export default router