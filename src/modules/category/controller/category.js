import cloudinary from "./../../../utils/cloudinary.js";
import categoryModel from "./../../../../DB/model/Category.model.js";
import slugify from "slugify";
import { AsyncHandler } from "../../../utils/errorHandling.js";
export const createCategory = AsyncHandler(async (req, res, next) => {
const { name } = req.body;
if (await categoryModel.findOne({ name })) {
  return next(new Error("Duplicated name", { cause: 409 }));
}
const { public_id, secure_url } = await cloudinary.uploader.upload(
  req.file.path,
  { folder: `${process.env.APP_NAME}/category` }
);

const category = await categoryModel.create({
  name,
  slug: slugify(name, "-"),
  image: { public_id, secure_url },
  createdBy:req.user._id,
});

return res.status(201).json({ message: "done", category });
});

export const updateCategory = AsyncHandler(async (req, res, next) => {
const category = await categoryModel.findById(req.params.categoryId);
if (!category) {
return next(new Error("category doesnt exist", { cause: 400 }));
}
category.name = req.body.name;
category.slug = slugify(req.body.name,'-')
if(req.file){
const { public_id, secure_url } = await cloudinary.uploader.upload(
req.file.path,
{ folder: `${process.env.APP_NAME}/category` }

);
await cloudinary.uploader.destroy(category.image.public_id)

category.image={ public_id, secure_url }
}
category.updatedBy=req.user._id
await category.save();
return res.json({category})
});
 

export const getCategory = AsyncHandler(async (req, res, next) => {
const category = await categoryModel.findById(req.params.categoryId).populate({path:'SubCategory'});
return res.json({ category });
});