import Navbar from "../../Layout/Navbar.jsx";
import "../Home/Home.css";
import Post from "../../Post/Post.jsx";
import AddPost from "../../Post/AddPost.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../Redux/posts/postSlice.js";
import LoadingSpinner from "../../common/LoadingSpinner.jsx";
import { useApi } from "../../../hooks/useApi.js";

function Home() {
  const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const { request } = useApi();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await request("GET", "/post/getAllPosts");
        if (data) {
          dispatch(setPosts(data));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // console.log(posts);
  return (
    <div className="home-container">
      <div className="feed-container">
        <div className="navbar-wrapper">
          <Navbar />
        </div>
        <div className="posts-container">
          <AddPost />

          {loading ? (
            <LoadingSpinner variant="page" />
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
