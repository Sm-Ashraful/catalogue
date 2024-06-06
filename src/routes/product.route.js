import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createProduct,
  getProducts,
  getProductsByCategory,
  getSearchItem,
} from "../controller/product.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createProduct);
router.route("/").get(getProducts);
router.route("/category/:categoryId").get(getProductsByCategory);
router.route("/search").get(getSearchItem);

export default router;
