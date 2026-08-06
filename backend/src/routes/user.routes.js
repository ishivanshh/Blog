import { Router } from "express";
import { updateUserProfile, getUserProfile } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.get("/profile", verifyJWT, getUserProfile);
router.put("/profile", verifyJWT, upload.single("profilePicture"), updateUserProfile);

export default router;
