import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import "./OverFlowMenu.css";

function OverFlowMenu({ children, className }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="post-menu-wrapper" ref={menuRef}>
      <button
        className={`post-menu-btn ${className}`}
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <BsThreeDots size={18} />
      </button>

      {showMenu && <div className="post-menu-dropdown">{children}</div>}
    </div>
  );
}

export default OverFlowMenu;
