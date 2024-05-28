import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createVariant,
  getVariants,
} from "../controller/variant.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createVariant);

router.route("/").get(getVariants);

export default router;
