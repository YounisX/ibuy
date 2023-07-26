import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
export const createCategory = joi.object({
    name:joi.string().min(3).max(26).required(),
    file:generalFields.file.required(),
    createdBy:joi.string()
}
).required();

export const updateCategory = joi.object({
    categoryId:generalFields.id,
    name:joi.string().min(3).max(26),
    file:generalFields.file,
    updatedBy:joi.string()
}
).required();

