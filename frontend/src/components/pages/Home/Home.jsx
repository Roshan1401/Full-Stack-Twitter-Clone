import Navbar from "../../Layout/Navbar.jsx";
import "../Home/Home.css";
import Post from "../../Post/Post.jsx";
import AddPost from "../../Post/AddPost.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../Redux/posts/postSlice.js";

function Home() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/post/getAllPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        // console.log(data);
        dispatch(setPosts(data.data));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="feed-container">
        <div className="navbar-wrapper">
          <Navbar />
        </div>
        <div className="posts-container">
          <AddPost />
          <div className="posts-list">
            {/* Posts will be rendered here */}
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
