import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js";

const router = Router();

router.route("/")
  .post(createCategory)
  .get(getAllCategories);

router.route("/:id")
  .get(getCategoryById)
  .put(updateCategory);

export default router;