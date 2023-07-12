import cloudinary from './../../../utils/cloudinary.js';
import categoryModel from './../../../../DB/model/Category.model.js';
import slugify from 'slugify';
import { AsyncHandler } from '../../../utils/errorHandling.js';
export const createCategory = AsyncHandler( async(req,res,next)=>{

    const {name} = req.body;
    if(await categoryModel.findOne({name}))
    {
return next(new Error ('Duplicated name',{cause:409}));
    }
const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/category`})

const category = await categoryModel.create({
    name,
    slug:slugify(name,'-'),
    image:{public_id,secure_url}
})

return res.status(201).json({message:'done',category})
}  
)

export const updateCategory = (req,res,next)=>{
    const {name} = req.body;
    console.log(name);

}