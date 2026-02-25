import React from "react";
import { Link } from "react-router-dom";

function UserLink({ username, name, variant = "name" }) {
  const className = variant === "name" ? "post-name" : "post-username";
  return (
    <Link className={className} to={`/profile/${username}`}>
      {variant === "name" ? name : `@${username}`}
    </Link>
  );
}

export default UserLink;
