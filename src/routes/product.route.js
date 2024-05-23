import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createProduct } from "../controller/product.controller.js";

const router = Router();

router.route("/add").post(upload.single("image"), createProduct);

export default router;
