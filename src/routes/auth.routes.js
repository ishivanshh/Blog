import { Router } from "express";
import { loginUser, registerUser , logoutUser , profileUser } from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile" , verifyJWT, profileUser);
export default router;