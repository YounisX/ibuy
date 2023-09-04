import { Router } from "express";
import * as reviewController from './controller/review.js'
import auth from "../../middleware/auth.js";

const router = Router({mergeParams:true})





router.post('/',auth(['Admin']),reviewController.createReview);
router.put('/',auth(),reviewController.updateReview);




export default router 