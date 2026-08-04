import { Router } from "express";
import { createBlog, updateBlog, deleteBlog, getBlogById, getAllBlogs } from "../controllers/blog.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllBlogs);
router.post("/", verifyJWT, createBlog);
router.get("/:id", getBlogById);
router.put("/:id", verifyJWT, updateBlog);
router.delete("/:id", verifyJWT, deleteBlog);

export default router;