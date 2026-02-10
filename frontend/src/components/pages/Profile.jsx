import React from "react";
import ProfileHeader from "../profile/ProfileHeader";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ProfileStats from "../profile/ProfileStats";
import ProfileTabs from "../profile/ProfileTabs";
import EditProfile from "../profile/EditProfile";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth.userInfo);

  const [showEditProfile, setShowEditProfile] = useState(false);
  return (
    <div>
      <ProfileHeader user={user} />
      <ProfileStats user={user} onOpen={() => setShowEditProfile(true)} />
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
