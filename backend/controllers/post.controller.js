import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const addPost = asyncHandler(async (req, res) => {
  const { postContent } = req.body;

  if (!postContent?.trim()) {
    throw new ApiError(400, "Post content is required");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized! Please login to continue.");
  }

  const fileImages = req.files || [];

  const uploadedImages = [];

  for (const file of fileImages) {
    const uploadedImage = await uploadOnCloudinary(file.path);
    if (uploadedImage) {
      uploadedImages.push({
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      });
    }
  }

  const newPost = await Post.create({
    content: postContent,
    images: uploadedImages,
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

  res
    .status(200)
    .json(new ApiResponse(200, "Post fetched successfully.", post));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ isDeleted: false })
    .populate("author", "name username avatar")
    .sort({ createdAt: -1 });
  console.log(posts);

  res
    .status(200)
    .json(new ApiResponse(200, "Posts fetched successfully.", posts));
});

export { addPost, updatePost, deletePost, getPostById, getAllPosts };
