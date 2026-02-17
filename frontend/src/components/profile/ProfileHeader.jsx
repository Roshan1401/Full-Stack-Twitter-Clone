import React from "react";
import { ArrowLeft } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfileHeader() {
  const userProfile = useSelector((state) => state.profile.userProfile);
  const user = userProfile?.user;
  const postCount = userProfile?.postCount || 0;
  const navigate = useNavigate();

  return (
    <div className="backdrop-blur-[ sticky top-0 z-1 flex items-center gap-8 border-b border-solid border-[#2f3336] bg-[rgba(0,0,0,1)] px-4 py-1 text-white">
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer rounded-4xl p-2 hover:bg-[rgba(67,67,67,0.7)]"
      >
        <ArrowLeft />
      </button>
      <div className="gap-0.4 flex flex-col">
        <h3 className="text-xl font-bold">{user?.name}</h3>
        <span className="text-[13px] text-[rgb(113,118,123)]">
          {postCount} posts
        </span>
      </div>

      <button className="ml-auto cursor-pointer rounded-4xl p-2 hover:bg-[rgba(67,67,67,0.7)]">
        <FiSearch className="text-[rgb(239,243,244)]" size={20} />
      </button>
    </div>
  );
}

export default ProfileHeader;
