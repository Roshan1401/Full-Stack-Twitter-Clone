import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import { Bookmark } from "../models/bookmark.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  let isBookmarked = null;

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized! Please login to continue.");
  }

  if (!isValidObjectId(postId)) {
    throw new ApiError("Invalid Post ID");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError("Post not found", 404);
  }

  const existingBookmark = await Bookmark.findOne({
    bookmarkedBy: req.user._id,
    post: postId,
  });

  if (existingBookmark) {
    const bookmark = await Bookmark.findByIdAndDelete(existingBookmark._id);
    isBookmarked = false;
    return res.status(200).json(
      new ApiResponse(200, "Post removed from bookmarks", {
        bookmarkId: bookmark._id,
        isBookmarked,
      }),
    );
  }

  const bookmark = await Bookmark.create({
    bookmarkedBy: req.user._id,
    post: postId,
  });
  isBookmarked = true;
  return res.status(200).json(
    new ApiResponse(200, "Post bookmarked", {
      bookmarkId: bookmark._id,
      isBookmarked,
    }),
  );
});

const getBookmarks = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized! Please login to continue.");
  }

  const bookmarks = await Bookmark.find({
    bookmarkedBy: req.user._id,
  }).populate({
    path: "post",
    select: "content author createdAt files likes",
    populate: {
      path: "author",
      select: "name username avatar",
    },
  });

  return res.status(200).json(
    new ApiResponse(200, "Bookmarks retrieved successfully", {
      bookmarks: bookmarks,
    }),
  );
});

export { toggleBookmark, getBookmarks };
