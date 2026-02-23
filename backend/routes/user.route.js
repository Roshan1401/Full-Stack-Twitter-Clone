import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  getUser,
  getUserProfile,
  getRandomUsers,
  EditProfile,
} from "../controllers/user.controller.js";
import { uploadProfile } from "../middleware/uploadProfile.middleware.js";

const router = Router();

router.route("/getUser").get(authenticateUser, getUser);
router.route("/profile/:username").get(getUserProfile);
router.route("/random").get(authenticateUser, getRandomUsers);
router.route("/edit").put(
  authenticateUser,
  uploadProfile.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  EditProfile,
);

export default router;
