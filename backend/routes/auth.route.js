import { Router } from "express";
import { signUp, login, logout } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(authenticateUser, logout);

export default router;
