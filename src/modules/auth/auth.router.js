import { Router } from "express";
import *as authController from '../auth/controller/registration.js'
const router = Router()


router.post('/',authController.signUp);

export default router