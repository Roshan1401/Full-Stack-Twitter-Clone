import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Like } from "../models/likes.model.js";
import { Bookmark } from "../models/bookmark.model.js";

const EditProfile = asyncHandler(async (req, res) => {
  const { name, bio } = req.body;
  const avatarFile = req.files?.avatar?.[0];
  const bannerFile = req.files?.banner?.[0];

  if (!name && !bio && !avatarFile && !bannerFile) {
    throw new ApiError(
      400,
      "Please provide at least one field to update your profile.",
    );
  }

  const uploadedAvatar = avatarFile
    ? await uploadOnCloudinary(avatarFile.path, "avatars")
    : null;

  const uploadedBanner = bannerFile
    ? await uploadOnCloudinary(bannerFile.path, "banners")
    : null;

  const updatedUser = await User.findByIdAndUpdate(req.user._id, {
    name: name || req.user.name,
    bio: bio || req.user.bio,
    avatar: uploadedAvatar
      ? {
          url: uploadedAvatar.secure_url,
          publicId: uploadedAvatar.public_id,
        }
      : req.user.avatar,
    banner: uploadedBanner
      ? {
          url: uploadedBanner.secure_url,
          publicId: uploadedBanner.public_id,
        }
      : req.user.banner,
  });

  if (!updatedUser) {
    throw new ApiError(
      500,
      "Failed to update profile. Please try again later.",
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully.", updatedUser));
});

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
  })
    .sort({ createdAt: -1 })
    .populate("author", "name username avatar");

  // Check if current user has liked and bookmarked each post
  const currentUserId = req.user?._id;
  const postsWithStatus = await Promise.all(
    userPosts.map(async (post) => {
      const isLiked = currentUserId
        ? await Like.exists({ likedBy: currentUserId, post: post._id })
        : false;
      const isBookmarked = currentUserId
        ? await Bookmark.exists({ bookmarkedBy: currentUserId, post: post._id })
        : false;

      return {
        ...post.toObject(),
        isLiked: !!isLiked,
        isBookmarked: !!isBookmarked,
      };
    }),
  );

  res.status(200).json(
    new ApiResponse(200, "User fetched successfully.", {
      user,
      posts: postsWithStatus,
      postCount: postsWithStatus.length,
      followers: user.followers,
      following: user.following,
    }),
  );
});

const getRandomUsers = asyncHandler(async (req, res) => {
  const user = req.user;

  const alreadyFollowingIds = user.following.map((id) => id) || [];

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

  res
    .status(200)
    .json(new ApiResponse(200, "Random users fetched successfully.", users));
});

export { getUser, getUserProfile, getRandomUsers, EditProfile };
