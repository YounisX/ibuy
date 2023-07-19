import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
 export const createCoupon = joi.object({
    name: joi.string().required(),
    image: joi.object(),
    discount: joi.number().required(),
    expiryDate: joi.date().required(),
    usedBy: generalFields.id.required(),
    createdBy: generalFields.id.required()
}).required();
 export const updateCoupon = joi.object({
    couponId: generalFields.id.required(),
    name: joi.string(),
    image: joi.object(),
    discount: joi.number(),
    expiryDate: joi.date(),
    usedBy: generalFields.id,
    createdBy: generalFields.id
}).required();