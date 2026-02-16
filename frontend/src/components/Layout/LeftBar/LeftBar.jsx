import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logo3.png";
import { MdHome } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FiBookmark, FiSettings, FiLogOut } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import userLogo from "../../../assets/userLogo1.jpg";
import "./LeftBar.css";
import Avatar from "../../Avatar/Avatar.jsx";
import Modal from "../../Modal/Modal.jsx";
import AddPost from "../../Post/AddPost.jsx";
import OverFlowMenu from "../../common/OverFlowMenu.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout as authLogout } from "../../../Redux/auth/authSlice";

function LeftBar() {
  const user = useSelector((state) => state.auth.userInfo);
  const username = user?.username;

  const barItems = [
    {
      name: "Home",
      slug: "/",
      icon: <MdHome />,
    },
    {
      name: "Explore",
      slug: "/explore",
      icon: <FiSearch />,
    },
    {
      name: "Notifications",
      slug: "/notifications",
      icon: <IoNotificationsOutline />,
    },
    {
      name: "Bookmarks",
      slug: "/bookmarks",
      icon: <FiBookmark />,
    },
    {
      name: "Profile",
      slug: `/profile/${username}`,
      icon: <CgProfile />,
    },
    {
      name: "Setting",
      slug: "/setting",
      icon: <FiSettings />,
    },
  ];

  const [showAddPost, setShowAddPost] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollHomeToTop = () => {
    document.body.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "post",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        console.log("Logout successful");
        dispatch(authLogout());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav-container">
      <nav>
        <div>
          <Link to="/home">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          </Link>
        </div>

        <ul>
          {barItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.slug}
                className={({ isActive }) =>
                  `item-container${isActive ? " item-container--active" : ""}`
                }
                onClick={() => {
                  if (item.name === "Home" && location.pathname === "/") {
                    scrollHomeToTop();
                  }
                }}
              >
                <div className="icon">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="post-btn">
          <button onClick={() => setShowAddPost(true)}>Post</button>
        </div>

        <div className="profile-btn">
          <div className="profile-container group">
            <div className="profile-img">
              <Avatar imgUrl={user?.avatar || userLogo} />
            </div>
            <Link className="profile-info" to={`/profile/${user?.username}`}>
              <div>{user?.name}</div>
              <div>{user?.username}</div>
            </Link>
            <OverFlowMenu>
              <button className="" onClick={() => handleLogout()}>
                Logout
              </button>
            </OverFlowMenu>{" "}
          </div>
        </div>
      </nav>

      {showAddPost && (
        <Modal onClose={() => setShowAddPost(false)}>
          <AddPost variant="modal" onClose={() => setShowAddPost(false)} />
        </Modal>
      )}
    </div>
  );
}

export default LeftBar;
