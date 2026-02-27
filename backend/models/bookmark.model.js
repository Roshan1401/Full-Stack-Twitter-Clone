import mongoose, { Schema } from "mongoose";

const bookmarkSchema = new Schema(
  {
    bookmarkedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true },
);

bookmarkSchema.index({ bookmarkedBy: 1, post: 1 }, { unique: true });

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
