import joi from "joi";
import { generalFields } from "../../middleware/validation.js";


export const createsubCategory = joi.object({
    categoryId:generalFields.id,
    customId:joi.string(),
    name:joi.string().min(3).max(26).required(),
    file:generalFields.file.required()
    
}
).required();

export const updatesubCategory = joi.object({
    subCategoryId:generalFields.id,
    categoryId:generalFields.id,
    name:joi.string().min(3).max(26),
    file:generalFields.file
}
).required();

