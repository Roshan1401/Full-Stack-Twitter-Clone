import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { followUser, unfollowUser } from "../controllers/follow.controller.js";

const router = Router();

router.route("/follow").post(authenticateUser, followUser);
router.route("/unfollow").post(authenticateUser, unfollowUser);

export default router;
