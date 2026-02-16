import React from "react";
import "./Follows.css";
import Avatar from "../../../Avatar/Avatar.jsx";
import { Link } from "react-router-dom";
function Follows({ imgUrl, name, username }) {
  return (
    <div className="container">
      <Avatar imgUrl={imgUrl} />
      <div className="info">
        <Link className="name" to={`/profile/${username}`}>
          {name}
        </Link>
        <Link className="username" to={`/profile/${username}`}>
          {username}
        </Link>
      </div>
      <div className="follow-btn">
        <button>Follow</button>
      </div>
    </div>
  );
}

export default Follows;
