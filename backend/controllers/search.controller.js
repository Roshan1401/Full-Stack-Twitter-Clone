import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const searchUsers = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Query parameter is required.");
  }

  const users = await User.find({
    $or: [
      {
        username: { $regex: `^${query}`, $options: "i" },
      },
      {
        name: { $regex: `^${query}`, $options: "i" },
      },
    ],
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully.", users));
});

export { searchUsers };
