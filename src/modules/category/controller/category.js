import cloudinary from './../../../utils/cloudinary.js';
import categoryModel from './../../../../DB/model/Category.model.js';
import slugify from 'slugify';
export const createCategory = async(req,res,next)=>{
try {
    const {name} = req.body;
const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/category`})

const category = await categoryModel.create({
    name,
    slug:slugify(name,'-'),
    image:{public_id,secure_url}
})
await category.save();

return res.status(201).json({message:'done',category})
    
} catch (error) {
return res.json({message:error.message})
    
}



}
