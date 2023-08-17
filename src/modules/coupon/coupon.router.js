import { Router } from "express";
import * as couponController from './controller/coupon.js'
import { cloudUpload, fileValidation } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from '../coupon/coupon.validation.js';
import auth, { roles } from './../../middleware/auth.js';

const router = Router({ caseSensitive: false });

router.get('/', (req, res) => {
  res.status(200).json({ message: "Coupon Module" });
});

router.post('/create',
validation(validators.headers,true),
auth([roles.Admin]),
  cloudUpload(fileValidation.image).single('image'),
validation(validators.createCoupon),  
  couponController.createCoupon
);

router.put('/:couponId',
  auth([roles.Admin]),
  cloudUpload(fileValidation.image).single('image'),
  validation(validators.updateCoupon),
  couponController.updateCoupon
);

router.get('/:couponId',
  couponController.getCoupon
);

export default router;









// import { Router } from "express";
// const router = Router({ mergeParams: true });
// import * as couponController from './controller/coupon.js';
// import { cloudUpload, fileValidation } from "../../utils/multer.js";
// import { validation } from "../../middleware/validation.js";
// import * as validators from '../coupon/coupon.validation.js';
//  router.get('/', (req, res) => {
//   res.status(200).json({ message: "Coupon Module" });
// });
//  router.post('/create',
//   cloudUpload(fileValidation.image).single('image'),
//   validation(validators.createCoupon),
//   couponController.createCoupon
// );
//  router.put('/:couponId',
//   cloudUpload(fileValidation.image).single('image'),
//   validation(validators.updateCoupon),
//   couponController.updateCoupon
// );
//  router.get('/:couponId',
//   couponController.getCoupon
// );
//  export default router;
