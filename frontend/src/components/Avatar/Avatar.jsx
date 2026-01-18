import React from 'react'
import "../Avatar/Avatar.css"

function Avatar({imgUrl}) {
    return (
        <div className='image-container'>
                <img src={imgUrl} alt="avatar" />
            </div>
    )
}

export default Avatar
