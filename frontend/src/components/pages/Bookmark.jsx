import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { ArrowLeft } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Post from "../Post/Post.jsx";
import LoadingSpinner from "../common/LoadingSpinner";
import { setBookmarks } from "../../Redux/bookmarks/bookmarkslice.js";

function Bookmark() {
  const [loading, setLoading] = useState(true);
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { request } = useApi();

  const fetchBookmarks = async () => {
    try {
      const data = await request("GET", "/bookmark", {
        withCredentials: true,
      });

      if (data) {
        dispatch(setBookmarks(data.bookmarks));
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);
  return !loading ? (
    <div>
      <div className="backdrop-blur-[ sticky top-0 z-1 flex items-center gap-8 border-b border-solid border-[#2f3336] bg-[rgba(0,0,0,1)] px-4 py-2 text-white">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer rounded-4xl p-2 hover:bg-[rgba(67,67,67,0.7)]"
        >
          <ArrowLeft />
        </button>
        <div className="gap-0.4 flex flex-col">
          <h1 className="text-2xl font-bold text-white">Bookmarks</h1>
        </div>
      </div>

      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <Post key={bookmark._id} post={bookmark.post} />
        ))
      ) : (
        <p className="mt-4 text-center text-sm text-neutral-400">
          No bookmarks found.
        </p>
      )}
    </div>
  ) : (
    <LoadingSpinner variant="page" />
  );
}

export default Bookmark;
