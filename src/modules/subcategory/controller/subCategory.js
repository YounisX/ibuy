import cloudinary from "./../../../utils/cloudinary.js";
import subCategoryModel from "../../../../DB/model/SubCategory.model.js";
import slugify from "slugify";
import { AsyncHandler } from "../../../utils/errorHandling.js";
import categoryModel from "../../../../DB/model/Category.model.js";
import { nanoid } from "nanoid";
export const createsubCategory = AsyncHandler(async (req, res, next) => {
const {categoryId} = req.params;
console.log(categoryId);


  const { name } = req.body;
  
  if (await subCategoryModel.findOne({ name })) {
    return next(new Error("Duplicated name", { cause: 409 }));
  }

  if(!await categoryModel.findById(categoryId)){
    return next(new Error('invalid categoryId',{cause:400}))
}
  const customId = nanoid();
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/category/subCategory/${categoryId}/${customId}` }
  );

  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name, "-"),
    image: { public_id, secure_url },
    categoryId,
    customId
  });

  return res.status(201).json({ message: "done", subCategory });
});

export const updatesubCategory = AsyncHandler(async (req, res, next) => {
 
  const {categoryId,subCategoryId} = req.params
  const subCategory = await subCategoryModel.findOne({_id:subCategoryId,categoryId});
  if (!subCategory) {
    return next(new Error("subCategory doesnt exist", { cause: 400 }));
  }
 subCategory.name = req.body.name;
 subCategory.slug = slugify(req.body.name,'-')
 
 if(req.file){
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/category/subCategory/${categoryId}/${subCategory.customId}`}
  );
   await cloudinary.uploader.destroy(subCategory.image.public_id)
   subCategory.image={ public_id, secure_url}
  }

 await subCategory.save();
 return res.json({subCategory})
});



export const getsubCategory = AsyncHandler(async (req, res, next) => {


});
