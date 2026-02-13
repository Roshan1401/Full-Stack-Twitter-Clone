import React, { useEffect } from "react";
import ProfileHeader from "../profile/ProfileHeader";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ProfileStats from "../profile/ProfileStats";
import ProfileTabs from "../profile/ProfileTabs";
import EditProfile from "../profile/EditProfile";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../Redux/profile/profileSlice.js";

function Profile() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const username = useParams().username;
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserProfile();
  }, [username]);

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
        console.log(data);
        dispatch(setUserProfile(data.data));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  return (
    <div>
      <ProfileHeader />
      <ProfileStats onOpen={() => setShowEditProfile(true)} />
      <ProfileTabs />

      {showEditProfile && (
        <Modal onClose={() => setShowEditProfile(false)}>
          <EditProfile onClose={() => setShowEditProfile(false)} />
        </Modal>
      )}
    </div>
  );
}

export default Profile;
