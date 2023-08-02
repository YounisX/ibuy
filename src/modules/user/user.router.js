import { Router } from "express";
import *as authController from '../user/controller/user.js'
import auth, { roles } from "../../middleware/auth.js";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"User Module"})
})

router.patch('/forgotPassword',auth(Object.values(roles)),authController.sendCode);
router.patch('/resetPassword',auth(Object.values(roles)),authController.resetPassword);



export default router