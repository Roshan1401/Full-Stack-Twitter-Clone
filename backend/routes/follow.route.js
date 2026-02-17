import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { followUser, unfollowUser } from "../controllers/follow.controller.js";

const router = Router();

router.route("/follow/:userIdToFollow").post(authenticateUser, followUser);
router
  .route("/unfollow/:userIdToUnfollow")
  .post(authenticateUser, unfollowUser);

export default router;
