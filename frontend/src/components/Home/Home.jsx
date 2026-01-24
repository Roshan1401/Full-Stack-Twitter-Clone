import React from 'react'
import Navbar from './Navbar'
import RightBar from '../RIghtBar/RIghtBar'
import "../Home/Home.css"
import Post from '../Post/Post.jsx'
import AddPost from './AddPost.jsx'

function Home() {
    return (
        <div className='home-container'>
            <div className='feed-container'>
                <div className='navbar-wrapper'>
                    <Navbar />
                </div>
                <div className='posts-container'>
                    <AddPost />
                    <div className='posts-list'>
                        {/* Posts will be rendered here */}
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
