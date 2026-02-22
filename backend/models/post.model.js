import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    files: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
        type: {
          type: String,
        },
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", postSchema);
