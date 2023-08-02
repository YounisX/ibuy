import { Router } from "express";
import subCategory from "../subcategory/subcategory.router.js";
import * as categoryController from "./controller/category.js";
import { cloudUpload, fileValidation } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "../category/category.validation.js";
import auth, { roles } from "./../../middleware/auth.js";
const router = Router({ caseSensitive: false });

router.use("/:categoryId/subCategory", subCategory);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Category Module" });
});

router.post(
  "/create",
  auth([roles.Admin]),
  cloudUpload().single("image"),
  validation(validators.createCategory),
  categoryController.createCategory
);

router.put(
  "/:categoryId",
  auth([roles.Admin]),
  cloudUpload().single("image"),
  validation(validators.updateCategory),
  categoryController.updateCategory
);

router.get(
  "/:categoryId",
  auth(Object.values(roles)),
  categoryController.getCategory
);

export default router;
