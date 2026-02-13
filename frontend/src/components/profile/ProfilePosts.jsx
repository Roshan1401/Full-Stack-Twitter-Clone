import React from "react";
import { useSelector } from "react-redux";
import Post from "../Post/Post";

function ProfilePosts() {
  const userProfile = useSelector((state) => state.profile.userProfile);
  const userPosts = userProfile?.posts || [];
  return (
    <>
      {userPosts.length === 0 && (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
          <h2 className="text-xl font-semibold text-gray-500">No posts yet</h2>
          <p className="text-sm text-gray-500">
            When you share posts, they will appear here.
          </p>
        </div>
      )}
      {userPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}

export default ProfilePosts;
