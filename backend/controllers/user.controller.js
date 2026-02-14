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

const getRandomUsers = asyncHandler(async (req, res) => {
  const user = req.user;

  const alreadyFollowingIds = user.following.map((id) => id) || [];
  console.log("alraedy Following", alreadyFollowingIds);

  const users = await User.aggregate([
    {
      $match: {
        _id: { $ne: user?._id, $nin: alreadyFollowingIds },
      },
    },
    { $sample: { size: 3 } },
    {
      $project: {
        name: 1,
        username: 1,
        avatar: 1,
      },
    },
  ]);

  console.log(users);
  console.log(typeof user._id);
  console.log(user._id);

  res
    .status(200)
    .json(new ApiResponse(200, "Random users fetched successfully.", users));
});

export { getUser, getUserProfile, getRandomUsers };
