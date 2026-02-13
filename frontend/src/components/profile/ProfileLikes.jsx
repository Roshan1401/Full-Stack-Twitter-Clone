import React from "react";

function ProfileLikes() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
      <h2 className="text-xl font-semibold text-gray-500">No likes yet</h2>
      <p className="text-sm text-gray-500">
        When you like posts, they will appear here.
      </p>
    </div>
  );
}

export default ProfileLikes;
