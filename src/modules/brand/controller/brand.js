import brandModel from "../../../../DB/model/Brand.model.js";
import cloudinary from '../../../utils/cloudinary.js'
import slugify from 'slugify'
import { AsyncHandler } from "../../../utils/errorHandling.js";

export const createBrand = AsyncHandler(async(req,res,next)=>{
    const {name,image} = req.body;
    // const {createdBy}= req.params;
    
    // if(!createdBy){
    //     return next(Error('createdby not entered',{cause:401}))
    // }
    const {puplicId,secureUrl} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/Brands`})
    const brand = await brandModel.create({name,slug:slugify(name,'-'),image:{puplicId,secureUrl}})
   return res.json({brand})

})