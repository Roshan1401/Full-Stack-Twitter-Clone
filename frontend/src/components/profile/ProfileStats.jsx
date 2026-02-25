import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FollowBtn from "../common/FollowBtn";
import { useApi } from "../../hooks/useApi.js";
import { userProfileRefetch } from "../../hooks/userProfileRefetch.js";

function ProfileStats({ onOpen }) {
  const [scrollBlur, setScrollBlur] = useState(0);
  const userProfile = useSelector((state) => state.profile.userProfile);
  const user = userProfile?.user || {};
  const followers = userProfile?.followers || [];
  const following = userProfile?.following || [];
  const currentUser = useSelector((state) => state.auth.userInfo);
  const currentUsername = useSelector((state) => state.auth.userInfo?.username);
  const checkedUserFollowing = followers.includes(currentUser?._id);
  const { request } = useApi();

  const [showEditProfile, setShowEditProfile] = useState(true);
  const paramsUsername = useParams().username;

  const refetchProfile = userProfileRefetch();

  const handleFollow = async (state) => {
    if (!state || !user?._id) return;
    try {
      await request("POST", `/${state}/${user._id}`, {});
      await refetchProfile(paramsUsername, request);
    } catch (error) {
      console.error("Error fetching follow data:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const blur = Math.min(window.scrollY / 30, 8);
      setScrollBlur(blur);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (paramsUsername === currentUsername) {
      setShowEditProfile(true);
    } else {
      setShowEditProfile(false);
    }
  }, [paramsUsername, currentUsername]);

  useEffect(() => {}, [user, followers, following]);

  return (
    <div className="relative">
      <div className="h-45 w-full overflow-hidden border">
        <img
          src={user.banner?.url || "/banner.jpg"}
          className="h-full w-full bg-amber-50 object-cover transition-all duration-100"
          style={{ filter: `blur(${scrollBlur}px)` }}
          alt=""
        />
      </div>

      <div className="bottom absolute inset-x-0 top-28 ml-5 h-33.5 w-33.5 overflow-hidden rounded-full border-4 border-black bg-gray-300">
        <img
          src={user.avatar?.url || "/userLogo1.jpg"}
          className="h-full w-full object-cover"
          alt="Profile"
        />
      </div>
      <div className="mb-2 p-4">
        <div className="mb-10 ml-auto flex justify-end">
          {showEditProfile ? (
            <button
              className="text-md cursor-pointer rounded-4xl border border-solid border-[rgb(83,100,113)] px-4 py-2 font-semibold text-white duration-75 hover:bg-[rgba(67,67,67,0.4)]"
              onClick={onOpen}
            >
              Edit Profile
            </button>
          ) : (
            <FollowBtn
              isFollowing={checkedUserFollowing}
              handleFollow={handleFollow}
              userId={user._id}
            />
          )}
        </div>

        <div className="space-y-3 text-white">
          <div className="flex flex-col gap-0">
            <h1 className="m-0 text-xl font-bold">{user.name}</h1>

            <span className="text-sm text-[rgb(113,118,123)]">
              @{user.username}
            </span>
          </div>

          <p className="text-md font-sans text-[#E7E9EA]">{user.bio}</p>

          {/* <div className="flex gap-4 text-sm text-[rgb(113,118,123)]">
            <p>Born January</p>
            <p>Joined February</p>
          </div> */}

          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-[17px] font-bold text-white">
                {following.length}
              </span>
              <span className="text-[16px] text-[rgb(113,118,123)]">
                Following
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[17px] font-bold text-white">
                {followers.length}
              </span>
              <span className="text-[16px] text-[rgb(113,118,123)]">
                Followers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileStats;
