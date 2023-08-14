import joi from 'joi'
import { generalFields } from '../../middleware/validation.js';

export const createProduct = joi.object({
    authorization:joi.string().required(),
    name : joi.string().min(2).max(150).required(),
    description: joi.string().min(2).max(150000).required(),
    price:joi.number().integer().positive().min(1).required(),
    price:joi.number().positive().min(1).required(),
    discount:joi.number().positive().min(0).max(100),
    file:{
        mainImage:joi.array().length(1).items(generalFields.file.required()).required(),
        subImages:joi.array().items(generalFields.file.required()).min(1).max(5).required(),
    },
    categoryId:generalFields.id,
    subCategoryId:generalFields.id,
    brandId:generalFields.id,
    createdBy:generalFields.id


}).required()
export const updateCategory = joi.object({
    authorization:joi.string().required(),
    name : joi.string().min(2).max(150),
    description: joi.string().min(2).max(150000),
    price:joi.number().integer().positive().min(1),
    price:joi.number().positive().min(1),
    discount:joi.number().positive().min(0).max(100),
    file:{
        mainImage:joi.array().length(1).items(generalFields.file).required(),
        subImages:joi.array().items(generalFields.file).min(1).max(5).required(),
    },
    categoryId:generalFields.id,
    subCategoryId:generalFields.id,
    brandId:generalFields.id,
    createdBy:generalFields.id


}).required()