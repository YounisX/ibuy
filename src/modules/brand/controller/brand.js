import brandModel from "../../../../DB/model/Brand.model.js";
import cloudinary from '../../../utils/cloudinary.js'
import slugify from 'slugify'
import { AsyncHandler } from "../../../utils/errorHandling.js";

export const createBrand = AsyncHandler(async(req,res,next)=>{
    const name = req.body.name.toLowerCase();
    // const {createdBy}= req.params;
    const findBrand= await brandModel.findOne({name});

  if(findBrand){
        return next(Error('Duplicate name',{cause:400}))
    }
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/brand`})
    const brand = await brandModel.create({
        name,
        slug:slugify(name,'-'),
        image:{public_id,secure_url},
        createdBy:req.user._id
      })
   return res.json({brand})

})

export const updateBrand = AsyncHandler(async (req, res, next) => {
    const brand = await brandModel.findById(req.params.brandId);
    if (!brand) {
      return next(new Error("Brand doesn't exist", { cause: 400 }));
    }
    if(brand.name==req.body.name){
            return next(Error('Duplicate name',{cause:400}))
    }

    brand.name = req.body.name.toLowerCase();
    brand.slug = slugify(brand.name, '-');
    if (req.file) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `${process.env.APP_NAME}/brand` }
      );
      await cloudinary.uploader.destroy(brand.image.public_id);
      brand.image = { public_id, secure_url };
    }
    brand.updatedBy = req.user._id; 
    await brand.save();
    return res.json({ brand });
  });
    export const getBrand = AsyncHandler(async (req, res, next) => {
    const brand = await brandModel.findById(req.params.brandId).populate({ path: 'SubBrand' });
    return res.json({ brand });
  });