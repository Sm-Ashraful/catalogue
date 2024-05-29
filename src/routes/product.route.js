import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createProduct,
  getProducts,
  getProductsByCategory,
} from "../controller/product.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createProduct);
router.route("/").get(getProducts);
router.route("/category/:categoryId").get(getProductsByCategory);

export default router;
