import React, { useEffect } from "react";
import ProfileHeader from "../profile/ProfileHeader";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ProfileStats from "../profile/ProfileStats";
import ProfileTabs from "../profile/ProfileTabs";
import EditProfile from "../profile/EditProfile";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../Redux/profile/profileSlice.js";
import { clearProfile } from "../../Redux/profile/profileSlice.js";
import Post from "../Post/Post.jsx";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
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
    setLoading(true);
    dispatch(clearProfile());
    fetchUserProfile();
  }, [username, dispatch]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/profile/${username}`,
        {
          withCredentials: true,
        },
      );

      const data = res.data;

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
      <Outlet />

      {showEditProfile && (
        <Modal onClose={() => setShowEditProfile(false)}>
          <EditProfile onClose={() => setShowEditProfile(false)} />
        </Modal>
      )}
    </div>
  ) : (
    <LoadingSpinner variant="page" />
  );
}

export default Profile;
