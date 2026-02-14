import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  getUser,
  getUserProfile,
  getRandomUsers,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/getUser").get(authenticateUser, getUser);
router.route("/profile/:username").get(getUserProfile);
router.route("/random").get(authenticateUser, getRandomUsers);

export default router;
