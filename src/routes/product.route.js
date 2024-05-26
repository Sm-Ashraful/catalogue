import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createProduct,
  getProducts,
} from "../controller/product.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createProduct);
router.route("/").get(getProducts);

export default router;
