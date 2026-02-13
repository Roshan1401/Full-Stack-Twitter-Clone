import React, { useEffect } from "react";
import ProfileHeader from "../profile/ProfileHeader";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ProfileStats from "../profile/ProfileStats";
import ProfileTabs from "../profile/ProfileTabs";
import EditProfile from "../profile/EditProfile";

function Profile() {
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = () => {
    try {
    } catch (error) {
      console.error("Error fetching user posts:", error);
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
