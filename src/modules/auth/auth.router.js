import { Router } from "express";
import *as authController from '../auth/controller/registration.js'
import * as validators from './auth.validation.js'
import { validation } from "../../middleware/validation.js";
const router = Router()


router.post('/signup',validation(validators.signup),authController.signup);
router.post('/login',authController.login);
router.get('/confirmEmail/:token',validation(validators.confirmEmail),authController.confirmEmail)
router.get('/newConfirmEmail/:token',validation(validators.confirmEmail),authController.newConfirmEmail);


export default router