import { Router } from "express";
import {
  addCategory,
  getCategories,
  getCategory,
} from "../controller/category.controller.js";

const router = Router();

router.route("/add").post(addCategory);
router.route("/").get(getCategories);

router.route("/id").post(getCategory);

export default router;
