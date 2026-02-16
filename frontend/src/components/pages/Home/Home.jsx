import Navbar from "../../Layout/Navbar.jsx";
import "../Home/Home.css";
import Post from "../../Post/Post.jsx";
import AddPost from "../../Post/AddPost.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../Redux/posts/postSlice.js";
import axios from "axios";

function Home() {
  const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/post/getAllPosts",
        {
          withCredentials: true,
        },
      );

      const data = res.data;
      if (data.success) {
        // console.log(data);
        dispatch(setPosts(data.data));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
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

          {loading ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
              <svg
                className="h-7 w-7 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Loading"
                role="img"
              >
                <path
                  fill="rgba(116, 192, 252, 1)"
                  d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8-79.3 23.6-137.1 97.1-137.1 184.1 0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256 512 397.4 397.4 512 256 512S0 397.4 0 256c0-116 77.1-213.9 182.9-245.4 16.9-5 34.8 4.6 39.8 21.5z"
                />
              </svg>
            </div>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
