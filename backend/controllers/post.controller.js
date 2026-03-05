import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";
import { Like } from "../models/likes.model.js";
import { Bookmark } from "../models/bookmark.model.js";

const addPost = asyncHandler(async (req, res) => {
  const { postContent } = req.body;

  if (!postContent?.trim()) {
    throw new ApiError(400, "Post content is required");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized! Please login to continue.");
  }

  const f = req.files || [];

  const uploadedFiles = [];

  for (const file of f) {
    const uploadedFile = await uploadOnCloudinary(file.path);
    if (uploadedFile) {
      uploadedFiles.push({
        url: uploadedFile.secure_url,
        publicId: uploadedFile.public_id,
        type: file.mimetype,
      });
    }
  }

  const newPost = await Post.create({
    content: postContent,
    files: uploadedFiles,
    author: req.user?._id,
  }).then((post) => post.populate("author", "name username avatar"));

  res
    .status(201)
    .json(new ApiResponse(201, "Post created successfully", newPost));
});

const updatePost = asyncHandler(async (req, res) => {
  //TODO : image update continue

  const { postId } = req.params;
  const { postContent } = req.body;

  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid Post id.");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized! Please login to continue.");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only can author update this post.");
  }

  if (!postContent.trim()) {
    throw new ApiError(400, "Post content is required.");
  }

  post.content = postContent || post.content;

  await post.save();

  res.status(200).json(new ApiResponse(200, "Post update successfully.", post));
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized! Please login to continue.");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only can author delete this post.");
  }

  post.isDeleted = true;
  await post.save();

  res.status(200).json(new ApiResponse(200, "Post deleted successfully."));
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid Post id.");
  }

  const post = await Post.findOne({
    _id: postId,
    isDeleted: false,
  }).populate("author", "username avatar");

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  const userId = req.user?._id;
  const isLiked = userId
    ? await Like.exists({ likedBy: userId, post: postId })
    : false;
  const isBookmarked = userId
    ? await Bookmark.exists({ bookmarkedBy: userId, post: postId })
    : false;

  const postWithStatus = {
    ...post.toObject(),
    isLiked: !!isLiked,
    isBookmarked: !!isBookmarked,
  };

  res
    .status(200)
    .json(new ApiResponse(200, "Post fetched successfully.", postWithStatus));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ isDeleted: false })
    .populate("author", "name username avatar createdAt")
    .sort({ createdAt: -1 });

  const userId = req.user?._id;
  const postsWithStatus = await Promise.all(
    posts.map(async (post) => {
      const isLiked = userId
        ? await Like.exists({ likedBy: userId, post: post._id })
        : false;
      const isBookmarked = userId
        ? await Bookmark.exists({ bookmarkedBy: userId, post: post._id })
        : false;

      return {
        ...post.toObject(),
        isLiked: !!isLiked,
        isBookmarked: !!isBookmarked,
      };
    }),
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Posts fetched successfully.", postsWithStatus));
});

export { addPost, updatePost, deletePost, getPostById, getAllPosts };
