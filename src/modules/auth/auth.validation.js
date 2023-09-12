import joi from "joi";
import { generalFields } from './../../middleware/validation.js';

export const signup = joi.object({
    userName:joi.string().min(2).max(100).required(),
    email:generalFields.email,
    password:generalFields.password,
    role:joi.string().valid('User','Admin').required()
}).required()
export const confirmEmail = joi.object({
    token:joi.string().required()
}).required()