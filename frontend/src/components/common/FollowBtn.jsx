import React from "react";

function FollowBtn({ isFollowing, handleFollow, userId }) {
  const [isHovering, setIsHovering] = React.useState(false);
  if (isFollowing) {
    return (
      <button
        className="text-md cursor-pointer rounded-3xl border border-solid border-[rgb(83,100,113)] bg-black px-5 py-1 font-bold text-white duration-75 hover:border-red-700 hover:bg-[rgba(255,1,1,0.12)] hover:text-red-500"
        onClick={() => handleFollow("unfollow", userId)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering ? "Unfollow" : "Following"}
      </button>
    );
  }

  return (
    <button
      className="text-md cursor-pointer rounded-3xl border border-solid border-[rgb(83,100,113)] bg-white px-4 py-2 font-bold text-black duration-75 hover:bg-[rgba(245,245,245,0.8)]"
      onClick={() => handleFollow("follow", userId)}
    >
      Follow
    </button>
  );
}

export default FollowBtn;
