import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";

const getUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully.", req.user));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "Username is required.");
  }

  const user = await User.findOne({ username }).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const userPosts = await Post.find({
    author: user._id,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, "User fetched successfully.", {
      user,
      posts: userPosts,
      postCount: userPosts.length,
      followers: user.followers.length,
      following: user.following.length,
    }),
  );
});

export { getUser, getUserProfile };
