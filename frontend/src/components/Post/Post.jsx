import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import userLogo from "../../assets/userLogo1.jpg"
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import "./Post.css"
import { BsThreeDots } from 'react-icons/bs';

function Post() {
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleEdit = () => {
        setShowMenu(false)
        console.log("Edit Post");
        //post edit

    }

    const handleDelete = () => {
        setShowMenu(false)
        console.log("Delete post")
        //delete post api
    }

    return (
        <div className='post-container'>
            <div className='post-avatar'>
                <Avatar imgUrl={userLogo} />
            </div>
            <div className='post-content'>
                <div className='post-header'>
                    <span className='post-name'>Edith</span>
                    <span className='post-username'>@patilRosha99</span>
                    <span className='post-time'>· 2h</span>

                    <div className='post-menu-wrapper' ref={menuRef}>
                        <button className='post-menu-btn'
                            onClick={() => setShowMenu(prev => !prev)}>
                            <BsThreeDots size={18} />
                        </button>

                        {showMenu && (
                            <div className="post-menu-dropdown">
                                <button onClick={handleEdit}>Edit</button>
                                <button className='delete' onClick={handleDelete}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='post-text'>
                    This is a sample post content.
                </div>

                <div className='post-actions'>
                    <button className="action-btn heart-btn">
                        <FaRegHeart size={18} />
                        <span>12</span>
                    </button>
                    <button className="action-btn comment-btn">
                        <FaRegComment size={18} />
                        <span>4</span>
                    </button>
                    <button className="action-btn bookmark-btn">
                        <FaRegBookmark size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post
