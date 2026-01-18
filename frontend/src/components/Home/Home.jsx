import React from 'react'
import Navbar from './Navbar'
import RightBar from '../RIghtBar/RIghtBar'
import "../Home/Home.css"
import userLogo from "../../assets/userLogo1.jpg"
import Avatar from '../Avatar/Avatar.jsx'
import TxtArea from "../Input/TxtArea.jsx"
import { FiImage } from 'react-icons/fi'
import Post from '../Post/Post.jsx'

function Home() {
    return (
        <div className='home-container'>
            <div className='feed-container'>
                <div className='navbar-wrapper'>
                    <Navbar />
                </div>
                <div className='posts-container'>
                    <div className='add-post'>
                        <div className='avatar'>
                            <Avatar imgUrl={userLogo} />
                        </div>
                        <div className='tweet'>
                            <TxtArea />
                            <div className='post-options'>
                                <FiImage className='image-icon' size={22} />
                                <button>Post</button>
                            </div>
                        </div>
                    </div>
                    <div className='posts-list'>
                        {/* Posts will be rendered here */}
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </div>
            </div>
            <div className='rightBar'>
                <RightBar />
            </div>
        </div>
    )
}

export default Home
