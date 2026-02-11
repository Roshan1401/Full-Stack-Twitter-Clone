import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  addPost,
  deletePost,
  getPostById,
  updatePost,
  getAllPosts,
} from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middlewaer.js";

const router = Router();

router.use(authenticateUser);

router.route("/getAllPosts").get(getAllPosts);
router.route("/").post(upload.array("files"), addPost);
router.route("/:postId").patch(updatePost);
router.route("/:postId").delete(deletePost);
router.route("/:postId").get(getPostById);

export default router;
