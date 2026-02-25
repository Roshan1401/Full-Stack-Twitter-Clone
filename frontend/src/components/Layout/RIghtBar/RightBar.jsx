import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Follows from "./FollowComponent/Follows";
import "./RightBar.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setUserProfile } from "../../../Redux/profile/profileSlice";
import Avatar from "../../Avatar/Avatar";

function RightBar() {
  const dispatch = useDispatch();
  const params = useParams();
  const paramsUsername = params.username;
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [profiles, setProfiles] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchRandomUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/random", {
        withCredentials: true,
      });

      const data = res.data;
      if (data.success) {
        setProfiles(data.data);
      }
    } catch (error) {
      console.error("Error fetching random users:", error);
    }
  };

  const refetchProfileData = async () => {
    if (paramsUsername) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/profile/${paramsUsername}`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          dispatch(setUserProfile(res.data.data));
        }
      } catch (error) {
        console.error("Error refetching profile data:", error);
      }
    }
  };

  const handleFollow = async (action, userId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/${action}/${userId}`,
        {},
        {
          withCredentials: true,
        },
      );

      const data = res.data;
      if (data.success) {
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
      }
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
          const res = await axios.get(
            `http://localhost:5000/api/v1/search/users?query=${search}`,
            {
              withCredentials: true,
            },
          );
          if (res.data.success) {
            setSearchResults(res.data.data);
          }
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
                    <Avatar imgUrl={user.avatar?.url || "/userLogo1.jpg"} />
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
