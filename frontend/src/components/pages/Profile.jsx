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
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import { useApi } from "../../hooks/useApi.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const username = useParams().username;
  const dispatch = useDispatch();
  const { request } = useApi();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const userPosts = userProfile?.posts || [];
  useEffect(() => {
    setLoading(true);
    dispatch(clearProfile());
    const fetchUserProfile = async () => {
      try {
        const data = await request("GET", `/user/profile/${username}`);
        if (data) {
          dispatch(setUserProfile(data));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [username, dispatch, request]);
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
