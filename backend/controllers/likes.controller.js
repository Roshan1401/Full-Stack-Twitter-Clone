import { Like } from "../models/likes.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const toggleLike = asyncHandler(async (req, res) => {
  let isLiked = null;
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

  const userId = req.user._id;

  const existingLike = await Like.findOne({ likedBy: userId, post: postId });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: -1 } },
      { new: true },
    ).populate("author", "name username avatar");
    isLiked = false;
    return res.status(200).json(
      new ApiResponse(200, "Post unliked successfully.", {
        likes: updatedPost.likes,
        isLiked,
      }),
    );
  }

  const createLike = await Like.create({
    likedBy: userId,
    post: postId,
  });

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { likes: 1 },
    },
    { new: true },
  ).populate("author", "name username avatar");

  if (!createLike) {
    throw new ApiError(500, "Failed to like the post. Please try again later.");
  }
  isLiked = true;
  return res.status(200).json(
    new ApiResponse(200, "Post liked successfully.", {
      likes: updatedPost.likes,
      isLiked,
    }),
  );
});

export { toggleLike };
