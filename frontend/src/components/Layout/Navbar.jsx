import React from "react";
import { useState } from "react";
import "./Navbar.css";

const navItems = [
  {
    name: "For You",
    id: "forYou",
  },
  {
    name: "Following",
    id: "following",
  },
];

function Navbar() {
  const [active, setActive] = useState("forYou");
  return (
    <div className="navbar">
      {navItems.map((item) => (
        <div
          key={item.id}
          className="nav-items"
          role="tab"
          tabIndex={0}
          onClick={() => setActive(item.id)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActive(item.id); }}
        >
          <div className="nav-text">
            <span style={{ color: `${active === item.id ? "white" : "gray"}` }}>
              {item.name}
            </span>
            <div
              className={`active-line ${active === item.id ? "show" : ""}`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Navbar;
