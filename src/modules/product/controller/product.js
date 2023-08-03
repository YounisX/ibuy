import subCategoryModel from "./../../../../DB/model/SubCategory.model.js";
import categoryModel from "./../../../../DB/model/Category.model.js";
import brandModel from "./../../../../DB/model/Brand.model.js";
import slugify from "slugify";
import cloudinary from './../../../utils/cloudinary.js';



export const createProduct = async (req, res, next) => {
  const { name, catergoryId, subCategoryId, brandId,price,discount } = req.body;

  //checking if this products belongs to a category
  const category = await categoryModel.findOne({
    _id: subCategoryId,
    catergoryId,
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
  const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`/${process.env.APP_NAME}/Category/SubCategory/Products`})



};