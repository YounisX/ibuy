import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';


export const forgotPassword = joi.object({
   
    email:generalFields.email 

}).required();