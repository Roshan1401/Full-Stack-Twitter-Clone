import React from 'react'
import Avatar from '../Avatar/Avatar'
import userLogo from "../../assets/userLogo1.jpg"
import { FaRegHeart, FaRegComment, FaRegBookmark  } from "react-icons/fa";
import "./Post.css"

function Post() {
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
                    <FaRegBookmark  size={18} />
                </button>
            </div>
            </div>
        </div>
    )
}

export default Post
