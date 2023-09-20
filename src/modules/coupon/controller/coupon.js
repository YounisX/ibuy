import cloudinary from "./../../../utils/cloudinary.js";
import couponModel from "../../../../DB/model/Coupon.model.js";
import slugify from "slugify";
import { AsyncHandler } from "../../../utils/errorHandling.js";



 export const createCoupon = AsyncHandler(async (req, res, next) => {
  
   const name  = req.body.name.toLowerCase();
  if (await couponModel.findOne({ name })) {
    return next(new Error("Duplicated title", { cause: 409 }));
  }

  if(req.file){
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/coupon` }
    );
    req.body.image = { public_id, secure_url }
  }
   const coupon = await couponModel.create(
req.body
  );
   return res.status(201).json({ message: "done", coupon });
});



 export const updateCoupon = AsyncHandler(async (req, res, next) => {
  const { subCategoryId, couponId } = req.params;
  const coupon = await couponModel.findOne({ _id: couponId, subCategoryId });
  if (!coupon) {
    return next(new Error("Coupon doesn't exist", { cause: 400 }));
  }
   coupon.title = req.body.title.toLowerCase();
  coupon.slug = slugify(req.body.title, '-');
   if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/category/subCategory/coupon/${subCategoryId}/${coupon.customId}` }
    );
    await cloudinary.uploader.destroy(coupon.image.public_id);
    coupon.image = { public_id, secure_url };
  }
   await coupon.save();
  return res.json({ coupon });
});
 export const getCoupon = AsyncHandler(async (req, res, next) => {
  const { couponId } = req.params;
  const coupon = await couponModel.findById(couponId);
  return res.json({ coupon });
});