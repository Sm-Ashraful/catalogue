import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createVariant } from "../controller/variant.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createVariant);

export default router;
