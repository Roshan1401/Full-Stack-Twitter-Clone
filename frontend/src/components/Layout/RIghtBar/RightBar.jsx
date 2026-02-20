import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Follows from "./FollowComponent/Follows";
import "./RightBar.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUserProfile } from "../../../Redux/profile/profileSlice";

function RightBar() {
  const dispatch = useDispatch();
  const params = useParams();
  const paramsUsername = params.username;
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [profiles, setProfiles] = useState([]);

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

  return (
    <div className="RightBar-container">
      <div className="search">
        <FiSearch />
        <input type="text" placeholder="Search" />
      </div>
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
