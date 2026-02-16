import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import userLogo from "../../../assets/userLogo1.jpg";
import Follows from "./FollowComponent/Follows";
import "./RightBar.css";
import axios from "axios";

function RightBar() {
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
                  imgUrl={profile?.imgUrl || userLogo}
                  name={profile?.name}
                  username={profile?.username}
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
