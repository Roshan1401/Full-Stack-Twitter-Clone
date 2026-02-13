import React, { useEffect } from "react";
import ProfileHeader from "../profile/ProfileHeader";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ProfileStats from "../profile/ProfileStats";
import ProfileTabs from "../profile/ProfileTabs";
import EditProfile from "../profile/EditProfile";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../Redux/profile/profileSlice.js";
import { clearProfile } from "../../Redux/profile/profileSlice.js";
import Post from "../Post/Post.jsx";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const username = useParams().username;
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const userPosts = userProfile?.posts || [];
  useEffect(() => {
    dispatch(clearProfile());
    fetchUserProfile();
  }, [username, dispatch]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/user/profile/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await res.json();

      if (data.success) {
        // console.log(data);
        dispatch(setUserProfile(data.data));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };
  return !loading ? (
    <div className="profile-content">
      <ProfileHeader />
      <ProfileStats onOpen={() => setShowEditProfile(true)} />
      <ProfileTabs />
      {userPosts.length === 0 && (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
          <h2 className="text-xl font-semibold text-gray-500">No posts yet</h2>
          <p className="text-sm text-gray-500">
            When you share posts, they will appear here.
          </p>
        </div>
      )}
      {userPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}

      {showEditProfile && (
        <Modal onClose={() => setShowEditProfile(false)}>
          <EditProfile onClose={() => setShowEditProfile(false)} />
        </Modal>
      )}
    </div>
  ) : (
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
  );
}

export default Profile;
