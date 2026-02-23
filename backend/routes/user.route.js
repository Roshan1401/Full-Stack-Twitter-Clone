import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  getUser,
  getUserProfile,
  getRandomUsers,
  EditProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/getUser").get(authenticateUser, getUser);
router.route("/profile/:username").get(getUserProfile);
router.route("/random").get(authenticateUser, getRandomUsers);
router.route("/edit").put(authenticateUser, EditProfile);

export default router;
