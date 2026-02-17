import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const followUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { userIdToFollow } = req.params;

  if (currentUser._id.toString() === userIdToFollow) {
    throw new ApiError(400, "You cannot follow yourself.");
  }

  const userToFollow = await User.findById(userIdToFollow);

  if (!userToFollow) {
    throw new ApiError(404, "User to follow not found.");
  }

  if (currentUser.following.includes(userIdToFollow)) {
    throw new ApiError(400, "You are already following this user.");
  }

  currentUser.following.push(userIdToFollow);
  userToFollow.followers.push(currentUser._id);

  await currentUser.save();
  await userToFollow.save();

  res.status(200).json(new ApiResponse(200, "User followed successfully."));
});

const unfollowUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { userIdToUnfollow } = req.params;

  if (currentUser._id.toString() === userIdToUnfollow) {
    throw new ApiError(400, "You cannot unfollow yourself.");
  }

  const userToUnfollow = await User.findById(userIdToUnfollow);

  if (!userToUnfollow) {
    throw new ApiError(404, "User to unfollow not found.");
  }

  if (!currentUser.following.includes(userIdToUnfollow)) {
    throw new ApiError(400, "You are not following this user.");
  }

  currentUser.following = currentUser.following.filter(
    (userId) => userId.toString() !== userIdToUnfollow,
  );
  userToUnfollow.followers = userToUnfollow.followers.filter(
    (userId) => userId.toString() !== currentUser._id.toString(),
  );

  await currentUser.save();
  await userToUnfollow.save();

  res.status(200).json(new ApiResponse(200, "User unfollowed successfully."));
});

export { followUser, unfollowUser };
