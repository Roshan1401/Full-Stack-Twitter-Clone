import React from 'react'
import { useState } from 'react'
import "../Home/Navbar.css"

function Navbar() {
    const [active, setActive] = useState("forYou");

    const navItems = [
        {
            name: "For You",
            id: "forYou"
        },
        {
            name: "Following",
            id: "following"
        }
    ];
    return (
        <div className='navbar'
        >
            {
                navItems.map((item) => (
                    <div className='nav-items' onClick={() => setActive(item.id)}>
                <div className="nav-text">
                    <span style={{color : `${active === item.id ? "white" : "gray"}`}}>{item.name}</span>
                    <div className= {`active-line ${active === item.id ?"show" : ""}`}></div>
                </div>
            </div>
                ))
            }
        </div>
    )
}

export default Navbar
