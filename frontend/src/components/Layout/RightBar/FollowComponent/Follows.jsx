import React, { useState } from "react";
import "./Follows.css";
import UserAvatar from "../../../common/UserAvatar.jsx";
import { Link } from "react-router-dom";
import FollowBtn from "../../../common/FollowBtn.jsx";

function Follows({ userData, userId, handleFollow, isFollowing = false }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="container">
      <UserAvatar user={userData} />
      <div className="info">
        <Link className="name" to={`/profile/${userData.username}`}>
          {userData.name}
        </Link>
        <Link className="username" to={`/profile/${userData.username}`}>
          @{userData.username}
        </Link>
      </div>
      <div className="follow-btn">
        <FollowBtn
          isFollowing={isFollowing}
          handleFollow={handleFollow}
          userId={userId}
        />
      </div>
    </div>
  );
}

export default Follows;
