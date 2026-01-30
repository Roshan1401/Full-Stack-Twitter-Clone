import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, "User fetched success fully.", req.user));
});

export { getUser };
