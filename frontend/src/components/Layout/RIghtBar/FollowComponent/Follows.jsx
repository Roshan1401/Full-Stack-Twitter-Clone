import React, { useState } from "react";
import "./Follows.css";
import Avatar from "../../../Avatar/Avatar.jsx";
import { Link } from "react-router-dom";
import userLogo from "../../../../assets/userLogo1.jpg";

function Follows({ userData, handleFollow, isFollowing = false }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="container">
      <Avatar imgUrl={userData?.imgUrl || userLogo} />
      <div className="info">
        <Link className="name" to={`/profile/${userData.username}`}>
          {userData.name}
        </Link>
        <Link className="username" to={`/profile/${userData.username}`}>
          @{userData.username}
        </Link>
      </div>
      <div className="follow-btn">
        {isFollowing ? (
          <button 
            className="following-btn"
            onClick={() => handleFollow("unfollow", userData._id)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isHovering ? "Unfollow" : "Following"}
          </button>
        ) : (
          <button onClick={() => handleFollow("follow", userData._id)}>
            Follow
          </button>
        )}
      </div>
    </div>
  );
}

export default Follows;
