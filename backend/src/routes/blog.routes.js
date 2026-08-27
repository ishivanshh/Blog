import { Router } from "express";
import { createBlog, updateBlog, deleteBlog, getBlogById, getAllBlogs, getMyBlogs } from "../controllers/blog.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.get("/", getAllBlogs);
router.get("/my", verifyJWT, getMyBlogs);
router.post("/", verifyJWT, upload.single("coverImage"), createBlog);
router.get("/:id", getBlogById);
router.put("/:id", verifyJWT, upload.single("coverImage"), updateBlog);
router.delete("/:id", verifyJWT, deleteBlog);

export default router;
