import React from 'react'
import "../FollowComponent/Follows.css"
import Avatar from '../../Avatar/Avatar.jsx'

function Follows({imgUrl, name, username}) {
    return (
        <div className='container'>
            <Avatar imgUrl={imgUrl} />
            <div className='info'>
                <div className='name'>{name}</div>
                <div className='username'>{username}</div>
            </div>
            <div className='follow-btn'>
                <button>
                Follow
            </button>
            </div>
        </div>
    )
}

export default Follows
