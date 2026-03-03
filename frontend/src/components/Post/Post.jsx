import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../common/UserAvatar";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import "./Post.css";
import OverFlowMenu from "../common/OverFlowMenu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserLink from "../common/UserLink";
import { useApi } from "../../hooks/useApi";
import {
  updatePostLikes,
  updatePostBookmark,
} from "../../Redux/posts/postSlice";
import { updateBookmark } from "../../Redux/bookmarks/bookmarkslice";

function Post({ post }) {
  console.log("Rendering Post:", post);
  const { content, files, author } = post;
  console.log("Post Author:", author);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const { request } = useApi();
  const dispatch = useDispatch();

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

  const handleLike = async () => {
    try {
      const data = await request("POST", `/post/${post._id}/like`, {
        withCredentials: true,
      });

      if (data) {
        console.log("Liked post:", data);

        dispatch(
          updatePostLikes({
            postId: post._id,
            likes: data.likes,
            isLiked: data.isLiked,
          }),
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      const data = await request("POST", `/bookmark/toggle/${post._id}`, {
        withCredentials: true,
      });

      if (data) {
        // Update bookmark list
        dispatch(
          updateBookmark({
            isBookmarked: data.isBookmarked,
            post: post,
          }),
        );
        // Update post bookmark status
        dispatch(
          updatePostBookmark({
            postId: post._id,
            isBookmarked: data.isBookmarked,
          }),
        );
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
    }
  };

  return (
    <div className="post-container">
      <div className="post-avatar">
        <UserAvatar user={author} />
      </div>
      <div className="post-content">
        <div className="post-header">
          <UserLink name={author.name} username={author.username} />
          <UserLink name={author.name} username={author.username} variant="username" />
          <span className="post-time">· {timeAgo(post.createdAt)}</span>

          <OverFlowMenu>
            <button onClick={handleEdit}>Edit</button>
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
          </OverFlowMenu>
        </div>
        <div className="post-text">{content}</div>

        {files.length > 0 && (
          <div
            className={`my-2 mt-2 grid gap-1 ${files.length === 1 ? "grid-cols-1" : "grid-cols-2"} overflow-hidden`}
          >
            {files.map((file) => (
              <div
                key={file.publicId}
                className="overflow-hidden rounded-2xl border border-neutral-800"
              >
                {file.type.startsWith("image/") ? (
                  <img
                    key={file.publicId}
                    src={file.url}
                    className="h-full w-full rounded-2xl object-cover"
                    alt={`Post Image ${file.publicId}`}
                  />
                ) : file.type.startsWith("video/") ? (
                  <video
                    key={file.publicId}
                    src={file.url}
                    className="h-full w-full rounded-2xl object-cover"
                    controls
                  />
                ) : null}
              </div>
            ))}
          </div>
        )}

        <div className="post-actions">
          <button
            className={`action-btn heart-btn ${post.isLiked ? "text-[#e0245e]" : ""}`}
            onClick={() => handleLike()}
          >
            {post.isLiked ? (
              <FaHeart size={18} color="#e0245e" />
            ) : (
              <FaRegHeart size={18} />
            )}
            <span className={post.isLiked ? "text-red-600" : ""}>
              {post.likes}
            </span>
          </button>
          <button className="action-btn comment-btn">
            <FaRegComment size={18} />
            <span></span>
          </button>
          <button
            onClick={() => handleBookmark()}
            className={`action-btn bookmark-btn ${post.isBookmarked ? "text-[#1d9bf0]" : ""}`}
          >
            {post.isBookmarked ? (
              <FaBookmark size={18} color="#1d9bf0" />
            ) : (
              <FaRegBookmark size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
