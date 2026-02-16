import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import userLogo from "../../../assets/userLogo1.jpg";
import Follows from "./FollowComponent/Follows";
import "./RightBar.css";

function RightBar() {
  const [profiles, setProfiles] = useState([]);

  const fetchRandomUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/user/random", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
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
