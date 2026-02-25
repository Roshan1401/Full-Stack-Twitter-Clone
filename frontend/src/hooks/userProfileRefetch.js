import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../Redux/profile/profileSlice";

export function userProfileRefetch() {
  const dispatch = useDispatch();
  const refetchProfile = useCallback(async (username, request) => {
    if (!username) return;
    try {
      const data = await request("GET", `/user/profile/${username}`);
      if (data) {
        dispatch(setUserProfile(data));
      }
      return data || null;
    } catch (error) {
      console.error("Error refetching user profile:", error);
      return null;
    }
  }, [dispatch]);
  return refetchProfile;
}
