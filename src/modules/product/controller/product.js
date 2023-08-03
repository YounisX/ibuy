import subCategoryModel from "./../../../../DB/model/SubCategory.model.js";
import categoryModel from "./../../../../DB/model/Category.model.js";
import brandModel from "./../../../../DB/model/Brand.model.js";
import slugify from "slugify";
import cloudinary from './../../../utils/cloudinary.js';
import { nanoid } from "nanoid";
import productModel from './../../../../DB/model/Product.model.js';



export const createProduct = async (req, res, next) => {
  const { name, catergoryId, subCategoryId, brandId,price,discount } = req.body;

  //checking if this products belongs to a category
  const category = await categoryModel.findOne({
    _id: subCategoryId,catergoryId,
  });
  if (!category) {
    return next(new Error("invalid category or subcategory "), { cause: 400 });
  }

  //checking if that product belongs to brand
  const brand = await brandModel.findOne({ _id: brandId });
  if (!brand) {
    return next(new Error("invalid Brand "), { cause: 400 });
  }

  req.body.slug = slugify(name, { lower: true, replacement: "-", trim: true });

  req.body.finalPrice = price - (price * discount||0) / 100; //finding if there's a
                                // discount and apply final price
req.body.customId = nanoid();
  const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`/${process.env.APP_NAME}/Category/SubCategory/Products/${req.body.customId}`})
  req.body.mainImage = {secure_url,public_id} ; 

if(req.files){
    req.body.subImages=[];
    for (const file of req.files) {
  const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`/${process.env.APP_NAME}/Category/SubCategory/Products/${req.body.customId}`})
        req.body.subImages.push({secure_url,public_id})
    }
}
req.body.createdBy = req.body._id;
const product = await productModel.create(req.body);
if(!product){
    return next(new Error("fail to create product"), { cause: 400 });
}
return res.json({product})

};