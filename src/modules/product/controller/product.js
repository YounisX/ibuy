
import subCategoryModel from './../../../../DB/model/SubCategory.model.js';

export const createProduct = async(req,res,next)=>{
    const {name,catergoryId,subCategoryId,brandId} = req.body; 
    // await subCategoryModel.findOne({_id:})
    // const checkCategory = 
}