import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProfileStats({ onOpen }) {
  const [scrollBlur, setScrollBlur] = useState(0);
  const userProfile = useSelector((state) => state.profile.userProfile);
  const user = userProfile?.user || {};
  const followers = userProfile?.followers || [];
  const following = userProfile?.following || [];

  const currentUsername = useSelector((state) => state.auth.userInfo?.username);

  const [showEditProfile, setShowEditProfile] = useState(true);
  const paramsUsername = useParams().username;

  useEffect(() => {
    const handleScroll = () => {
      const blur = Math.min(window.scrollY / 30, 8);
      setScrollBlur(blur);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log(paramsUsername);

    if (paramsUsername === currentUsername) {
      setShowEditProfile(true);
    } else {
      setShowEditProfile(false);
    }
    console.log("Show Edit Profile:", showEditProfile);
  }, [paramsUsername, currentUsername]);

  return (
    <div className="relative">
      <div className="h-45 w-full overflow-hidden border">
        <img
          src="/banner.jpg"
          className="h-full w-full bg-amber-50 object-cover transition-all duration-100"
          style={{ filter: `blur(${scrollBlur}px)` }}
          alt=""
        />
      </div>

      <div className="bottom absolute inset-x-0 top-28 ml-5 h-33.5 w-33.5 overflow-hidden rounded-full border-4 border-black bg-gray-300">
        <img
          src="/userLogo1.jpg"
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
            <button
              className="text-md cursor-pointer rounded-3xl border border-solid border-[rgb(83,100,113)] bg-white px-4 py-2 font-bold text-black duration-75 hover:bg-[rgba(255,255,255,0.7)]"
              onClick={onOpen}
            >
              Follow
            </button>
          )}
        </div>

        <div className="space-y-3 text-white">
          <div className="flex flex-col gap-0">
            <h1 className="m-0 text-xl font-bold">{user.name}</h1>

            <span className="text-sm text-[rgb(113,118,123)]">
              {user.username}
            </span>
          </div>

          {/* <p className="text-sm leading-snug">18 | Learning cool stuffs</p>

          <div className="flex gap-4 text-sm text-[rgb(113,118,123)]">
            <p>Born January</p>
            <p>Joined February</p>
          </div> */}

          <div className="flex gap-6 text-sm">
            <div className="flex gap-1">
              <span className="font-bold text-white">{followers.length}</span>
              <span className="text-[rgb(113,118,123)]">Follwers</span>
            </div>

            <div className="flex gap-1">
              <span className="font-bold text-white">{following.length}</span>
              <span className="text-[rgb(113,118,123)]">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileStats;
