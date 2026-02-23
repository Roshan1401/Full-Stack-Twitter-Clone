import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    avatar: {
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
    banner: {
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
    bio: {
      type: String,
      default: "Lear, Build, Sleep Repeat",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

// Hash password before saving to database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("User", userSchema);
