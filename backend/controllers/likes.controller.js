import { Like } from "../models/likes.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const toggleLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized! Please login to continue.");
  }

  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid Post id.");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  const userId = req.user._id.toString();

  const existingLike = await Like.findOne({ likedBy: userId, post: postId });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });
    return res
      .status(200)
      .json(new ApiResponse(200, "Post unliked successfully."));
  }

  const createLike = await Like.create({
    likedBy: userId,
    post: postId,
  });

  await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

  if (!createLike) {
    throw new ApiError(500, "Failed to like the post. Please try again later.");
  }

  return res.status(200).json(new ApiResponse(200, "Post liked successfully."));
});

export { toggleLike };
