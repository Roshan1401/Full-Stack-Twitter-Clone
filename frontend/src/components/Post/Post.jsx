import React, { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar/Avatar";
import userLogo from "../../assets/userLogo1.jpg";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import "./Post.css";
import OverFlowMenu from "../common/OverFlowMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Post({ post }) {
  const { content, images, author } = post;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const user = useSelector((state) => state.auth.userInfo);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setShowMenu(false);
    console.log("Edit Post");
    //post edit
  };

  const handleDelete = () => {
    setShowMenu(false);
    console.log("Delete post");
    //delete post api
  };

  return (
    <div className="post-container">
      <div className="post-avatar">
        <Avatar imgUrl={userLogo} />
      </div>
      <div className="post-content">
        <div className="post-header">
          <Link
            className="post-name"
            to={`/profile/${author.username || user?.username}`}
          >
            {author.name || user?.name}
          </Link>
          <Link
            className="post-username"
            to={`/profile/${author.username || user?.username}`}
          >
            {author.username || user?.username}
          </Link>
          <span className="post-time">· {timeAgo(post.createdAt)}</span>

          <OverFlowMenu>
            <button onClick={handleEdit}>Edit</button>
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
          </OverFlowMenu>
        </div>
        <div className="post-text">{content}</div>

        {images.length > 0 && (
          <div
            className={`my-2 mt-2 grid gap-1 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"} overflow-hidden`}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-lg border border-gray-500"
              >
                <img
                  key={image.id}
                  src={image.url}
                  className="h-full w-full rounded-lg object-cover"
                  alt={`Post Image ${image.id}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="post-actions">
          <button className="action-btn heart-btn">
            <FaRegHeart size={18} />
            <span>12</span>
          </button>
          <button className="action-btn comment-btn">
            <FaRegComment size={18} />
            <span>4</span>
          </button>
          <button className="action-btn bookmark-btn">
            <FaRegBookmark size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
