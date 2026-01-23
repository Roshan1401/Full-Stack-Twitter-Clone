import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo3.png"
import { MdHome } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FiBookmark, FiSettings, FiLogOut } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import userLogo from "../../assets/userLogo1.jpg"
import "../LeftBar/LeftBar.css"
import Avatar from '../Avatar/Avatar';
import Modal from '../Modal/Modal.jsx';
import AddPost from '../Home/AddPost.jsx';

function LeftBar() {

    const navigate = useNavigate()
    const barItems = [
        {
            name: "Home",
            slug: "/home",
            icon: <MdHome />
        },
        {
            name: "Explore",
            slug: "/explore",
            icon: <FiSearch />
        },
        {
            name: "Notifications",
            slug: "/notifications",
            icon: <IoNotificationsOutline />
        },
        {
            name: "Bookmarks",
            slug: "/bookmarks",
            icon: <FiBookmark />
        },
        {
            name: "Profile",
            slug: "/profile",
            icon: <CgProfile />
        }, {
            name: "Setting",
            slug: "/setting",
            icon: <FiSettings />
        },

        {
            name: "Logout",
            slug: "/logout",
            icon: <FiLogOut />
        },
    ]

    const [showAddPost, setShowAddPost] = useState(false)

    return (
        <div className='nav-container'>
            <nav>
                <div>
                    <Link to="/home">
                        <div className='logo'>
                            <img src={logo} alt="Logo" />
                        </div>
                    </Link>
                </div>

                <ul>
                    {barItems.map((item) => (
                        <li key={item.name}>
                            <div className='item-container'
                                onClick={() => navigate(item.slug)}>
                                <div className='icon'>
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>

                            </div>
                        </li>
                    ))}

                </ul>
                <div className='post-btn'>
                    <button onClick={() => setShowAddPost(true)}>Post</button>
                </div>

                <button className='profile-btn'>
                    <div className='profile-container'>
                        <div className="profile-img">
                            <Avatar imgUrl={userLogo} />
                        </div>
                        <div className='profile-info'>
                            <div>Roshan</div>
                            <div>@PatilRosha99</div>
                        </div>
                    </div>
                </button>

            </nav>

            {
                showAddPost && (
                    <Modal onClose={() => setShowAddPost(false)}>
                        <AddPost variant='modal' onClose={() => setShowAddPost(false)}/>
                    </Modal>
                )
            }
        </div>
    )
}

export default LeftBar
