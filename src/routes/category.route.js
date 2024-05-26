import { Router } from "express";
import {
  addCategory,
  getCategories,
} from "../controller/category.controller.js";

const router = Router();

router.route("/add").post(addCategory);
router.route("/").get(getCategories);

export default router;
