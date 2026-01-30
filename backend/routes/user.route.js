import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/getUser").get(authenticateUser, getUser);

export default router;
