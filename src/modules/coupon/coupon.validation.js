import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
 export const createCoupon = joi.object({
    name: joi.string().min(2).max(25).required(),
    file: generalFields.file,
    discount: joi.number().positive().min(1).max(100).required(),
    expiryDate: joi.number().positive().min(1).max(100)
}).required();
 export const updateCoupon = joi.object({
    couponId: generalFields.id,
    name: joi.string().min(2).max(25),
    image: generalFields.file,
    discount: joi.number(),
}).required();