import React from "react";
import { useSelector } from "react-redux";
import Post from "../Post/Post";
import EmptyState from "../common/EmptyState";

function ProfilePosts() {
  const userProfile = useSelector((state) => state.profile.userProfile);
  const userPosts = userProfile?.posts || [];
  return (
    <>
      {userPosts.length === 0 && (
        <EmptyState
          title="No Posts Yet"
          description="When you create a post, it will show up here."
        />
      )}
      {userPosts.map((post) => (
        <Post key={post._id} post={post} user={userProfile.user} />
      ))}
    </>
  );
}

export default ProfilePosts;
