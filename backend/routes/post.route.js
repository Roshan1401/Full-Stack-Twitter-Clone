import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { addPost, deletePost, getPostById, updatePost } from "../controllers/post.controller.js";

const router = Router()

router.use(authenticateUser)

router.route("/").post(addPost);
router.route("/:postId").patch(updatePost)
router.route("/:postId").delete(deletePost)
router.route("/:postId").get(getPostById)