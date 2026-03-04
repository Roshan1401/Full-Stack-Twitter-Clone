import React, { useEffect, useState } from "react";
import Follows from "./FollowComponent/Follows";
import "./RightBar.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { userProfileRefetch } from "../../../hooks/userProfileRefetch";
import Search from "../../common/Search";

function RightBar() {
  const params = useParams();
  const paramsUsername = params.username;
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [profiles, setProfiles] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { request } = useApi();
  const refetchProfile = userProfileRefetch();

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

      await refetchProfile(paramsUsername, request);
    } catch (error) {
      console.error("Error fetching follow data:", error);
    }
  };

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const data = await request("GET", "/user/random");
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching random users:", error);
      }
    };
    fetchRandomUsers();
  }, [request]);

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
  }, [search, request]);

  return (
    <div className="RightBar-container">
      <Search />
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
