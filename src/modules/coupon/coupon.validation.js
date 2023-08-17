import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
 

export const headers = joi.object({ authorization:generalFields.headers}).required()

 export const createCoupon = joi.object({
    name: joi.string().min(2).max(25).required(),
    file: generalFields.file,
    discount: joi.number().positive().min(1).max(100).required(),
expireDate: joi.date().greater(Date.now()).required()
}).required();



 export const updateCoupon = joi.object({
    couponId: generalFields.id,
    name: joi.string().min(2).max(25),
    image: generalFields.file,
    discount: joi.number(),
}).required();