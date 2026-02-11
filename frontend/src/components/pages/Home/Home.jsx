import React from "react";
import Navbar from "../../Layout/Navbar.jsx";
import RightBar from "../../Layout/RIghtBar/RightBar.jsx";
import "../Home/Home.css";
import Post from "../../Post/Post.jsx";
import AddPost from "../../Post/AddPost.jsx";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  const addNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

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
        setPosts(data.data);
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
          <AddPost addNewPost={addNewPost} />
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
