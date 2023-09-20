import subCategoryModel from "./../../../../DB/model/SubCategory.model.js";
import categoryModel from "./../../../../DB/model/Category.model.js";
import brandModel from "./../../../../DB/model/Brand.model.js";
import slugify from "slugify";
import cloudinary from './../../../utils/cloudinary.js';
import { nanoid } from "nanoid";
import productModel from './../../../../DB/model/Product.model.js';
import { AsyncHandler } from "../../../utils/errorHandling.js";
import ApiFeature from "../../../utils/apiFeature.js";







export const getAllProducts = AsyncHandler( async (req, res, next) => {

const apiFeature = new ApiFeature(productModel.find(),req.query).paginate().filter().sort().search() ;
const product =await apiFeature.mongooseQuery

// mongooseQuery.select(req.query.fields.replaceAll(","," "))


if(!product){
  return next(new Error("product not found", { cause: 400 }));
}
return res.status(200).json({message:'done',product})

})



export const createProduct = AsyncHandler( async (req, res, next) => {
  const { name, catergoryId, subCategoryId, brandId,price,discount } = req.body;

if(await productModel.findOne({name})){
  return next(new Error("product already exist", { cause: 400 }))}


  //checking if this products belongs to a category
  const category = await categoryModel.findOne({
    subCategoryId,catergoryId
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

  req.body.finalPrice = Number.parseFloat(price - (price * discount||0) / 100).toFixed(2) //finding if there's a
                                // discount and apply final price
req.body.paymentPricre = req.body.finalPrice ;                      

req.body.cutomId = nanoid();
  const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`/${process.env.APP_NAME}/Category/SubCategory/Products/${req.body.customId}`})
  req.body.mainImage = {secure_url,public_id} ; 
  
if(req.files.subImages){
    req.body.subImages=[];
    for (const file of req.files.subImages) {
  const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`/${process.env.APP_NAME}/Category/SubCategory/Products/${req.body.customId}`})
        req.body.subImages.push({secure_url,public_id})
    } 
}
req.body.createdBy = req.user._id;
const product = await productModel.create(req.body);
if(!product){ 
    return next(new Error("fail to create product"), { cause: 400 });
}
return res.json({product})

})



export const updateCategory = AsyncHandler( async (req, res, next) => {
//todo check the product id is valid or not  
  const {productId} = req.params; 
  const product = await productModel.findOne({productId})
  if(!product){
    return next(new Error("invalid product id"), { cause: 400 });
  }
//todo destruct data from body

  const { name, catergoryId, subCategoryId, brandId,price,discount } = req.body;

//todo check the category/subcategory

if(catergoryId&&subCategoryId){
if(!await subCategoryModel.findOne({_id:subCategoryId,catergoryId})){
  return next(new Error("invalid category or subcategory id"), { cause: 400 });
}
}
//todo check  brand

  const brand = await brandModel.findOne({ _id: brandId });
  if (!brand) {
    return next(new Error("invalid Brand "), { cause: 400 });
  }

//todo update slug

if(name){
  req.body.slug = slugify(name, { lower: true, replacement: "-", trim: true });
}
if(price && discount)
{
  req.body.finalPrice = Number.parseFloat(price-(price * discount) / 100).toFixed(2) //finding if there's a

}
else if (price) {
  product.discount = Math.floor(Number.parseFloat(product.discount))
  req.body.finalPrice = Number.parseFloat(price - (price * product.discount) / 100).toFixed(2) //finding if there's 
}
else if (discount) {
  req.body.finalPrice = Number.parseFloat(product.price - (product.price * discount) / 100).toFixed(2) //finding if there's a

}

// discount and apply final price
req.body.paymentPrice = req.body.finalPrice ;                      


if(req.files?.mainImage?.legnth){
  const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`/${process.env.APP_NAME}/Category/SubCategory/Products/${product.customId}`})
  await cloudinary.uploader.destroy(product.mainImage.public_id);
  req.body.mainImage = {secure_url,public_id} ; 
  
}

 
if(req.files.subImages?.subImages){
    req.body.subImages=[];
    for (const file of req.files.subImages) {
  const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`/${process.env.APP_NAME}/Category/SubCategory/Products/${product.customId.customId}`})
   await cloudinary.uploader.destroy(product.subImages.public_id);

        req.body.subImages.push({secure_url,public_id})
    } 
}

req.body.updatedBy = req.user._id;
await productModel.updateOne({_id:product._id},req.body)
const newProduct = await productModel.create(req.body);
if(!newProduct){ 
    return next(new Error("fail to create product"), { cause: 400 });
}
return res.json({newProduct})

})