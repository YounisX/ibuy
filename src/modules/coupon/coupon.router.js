import { Router } from "express";
const router = Router({ mergeParams: true });
import * as couponController from './controller/coupon.js';
import { cloudUpload, fileValidation } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from '../coupon/coupon.validation.js';
 router.get('/', (req, res) => {
  res.status(200).json({ message: "Coupon Module" });
});
 router.post('/create',
  cloudUpload().single('image'),
  validation(validators.createCoupon),
  couponController.createCoupon
);
 router.put('/:couponId',
  cloudUpload().single('image'),
  validation(validators.updateCoupon),
  couponController.updateCoupon
);
 router.get('/:couponId',
  couponController.getCoupon
);
 export default router;