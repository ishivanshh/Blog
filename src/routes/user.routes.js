import { Router } from "express";
import {updateUserProfile , getUserProfile} from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";



const router = Router();

router.get("/profile" , verifyJWT, getUserProfile);
router.put("/profile" , verifyJWT, updateUserProfile);

export default router;