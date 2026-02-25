import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Follows from "./FollowComponent/Follows";
import "./RightBar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setUserProfile } from "../../../Redux/profile/profileSlice";
import UserAvatar from "../../common/UserAvatar";
import { useApi } from "../../../hooks/useApi";

function RightBar() {
  const dispatch = useDispatch();
  const params = useParams();
  const paramsUsername = params.username;
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [profiles, setProfiles] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { request } = useApi();

  const fetchRandomUsers = async () => {
    try {
      const data = await request("GET", "/user/random");
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching random users:", error);
    }
  };

  const refetchProfileData = async () => {
    if (paramsUsername) {
      try {
        const data = await request("GET", `/user/profile/${paramsUsername}`);
        dispatch(setUserProfile(data));
      } catch (error) {
        console.error("Error refetching profile data:", error);
      }
    }
  };

  const handleFollow = async (action, userId) => {
    try {
      await request("POST", `/${action}/${userId}`, {});
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === userId
            ? {
                ...profile,
                followers:
                  action === "follow"
                    ? [...(profile.followers || []), currentUser._id]
                    : (profile.followers || []).filter(
                        (id) => id !== currentUser._id,
                      ),
              }
            : profile,
        ),
      );

      await refetchProfileData();
    } catch (error) {
      console.error("Error fetching follow data:", error);
    }
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    setSearchResults([]);
    const delayDebounceFn = setTimeout(() => {
      const searchUsers = async () => {
        try {
          const data = await request("GET", `/search/users?query=${search}`);
          setSearchResults(data);
        } catch (error) {
          console.error("Error searching users:", error);
        }
      };

      if (search.trim() !== "") {
        searchUsers();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="RightBar-container">
      <div className="search">
        <FiSearch />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {search.trim() !== "" && (
        <div className="rounded-lg border border-t-0 border-[#2f3336] bg-black">
          <div className="flex flex-col py-5">
            <p className="text-center text-sm text-neutral-400">
              Search People
            </p>
            <div className="mt-5">
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <Link
                    to={`/profile/${user.username}`}
                    key={user._id}
                    className="flex cursor-pointer gap-4 px-4 py-3 hover:bg-neutral-900"
                  >
                    <UserAvatar user={user} />
                    <div className="flex flex-col text-white">
                      <span className="text-md font-semibold">{user.name}</span>
                      <span className="text-sm text-[gray]">
                        @{user.username}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-sm text-neutral-400">
                  No users found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="card-container">
        <h2>Who to follow</h2>
        <div className="profiles-container">
          <ul>
            {profiles.map((profile) => (
              <li key={profile.username}>
                <Follows
                  userData={profile}
                  userId={profile._id}
                  handleFollow={handleFollow}
                  isFollowing={profile.followers?.includes(currentUser?._id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
