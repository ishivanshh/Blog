import { Router } from "express";
import { createBlog, updateBlog } from "../controllers/blog.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createBlog);
router.put("/:id", verifyJWT, updateBlog);

export default router;