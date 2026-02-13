import React from "react";
import { ArrowLeft } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

function ProfileHeader() {
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <div className="flex items-center gap-8 border-b border-solid border-[#2f3336] px-4 py-1 text-white backdrop:blur-sm">
      <button className="cursor-pointer rounded-4xl p-2 hover:bg-[rgba(67,67,67,0.7)]">
        <ArrowLeft />
      </button>
      <div className="gap-0.4 flex flex-col">
        <h3 className="text-xl font-bold">{user.name}</h3>
        <span className="text-[13px] text-[rgb(113,118,123)]">1933 posts</span>
      </div>

      <button className="ml-auto cursor-pointer rounded-4xl p-2 hover:bg-[rgba(67,67,67,0.7)]">
        <FiSearch className="text-[rgb(239,243,244)]" size={20} />
      </button>
    </div>
  );
}

export default ProfileHeader;
