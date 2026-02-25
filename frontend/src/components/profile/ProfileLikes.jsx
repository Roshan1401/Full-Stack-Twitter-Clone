import React from "react";
import EmptyState from "../common/EmptyState";

function ProfileLikes() {
  return (
    <EmptyState
      title="No Likes Yet"
      description="When you like a post, it will show up here."
    />
  );
}

export default ProfileLikes;
