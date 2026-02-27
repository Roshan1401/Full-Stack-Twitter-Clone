import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  toggleBookmark,
  getBookmarks,
} from "../controllers/bookmark.controller.js";

const router = Router();

router.route("/toggle/:postId").post(authenticateUser, toggleBookmark);
router.route("/").get(authenticateUser, getBookmarks);

export default router;
