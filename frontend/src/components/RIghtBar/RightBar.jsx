import React from 'react'
import { FiSearch } from "react-icons/fi";
import userLogo from "../../assets/userLogo1.jpg"
import Follows from './FollowComponent/Follows';
import "../RightBar/RightBar.css"

function RightBar() {

    const profiles = [
        {
            imgUrl : userLogo,
            name : "Edith",
            username : "@patilRosha99",
        },
        {
            imgUrl : userLogo,
            name : "Edith",
            username : "@patilRosha99",
        },
        {
            imgUrl : userLogo,
            name : "Edith",
            username : "@patilRosha99",
        },
    ]
    return (
        <div className='RightBar-container'>
            <div className='search'>
                <FiSearch />
                <input type="text"  placeholder='Search'/>
            </div>
            <div className='card-container'>
                <h2>Who to follow</h2>
                <div className='profiles-container'>
                    <ul>
                        {profiles.map((profile) => (
                            <li key={profile.username}>
                                <Follows imgUrl={profile.imgUrl} name={profile.name} username={profile.username}/>
                            </li>
                        ))}  
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RightBar
