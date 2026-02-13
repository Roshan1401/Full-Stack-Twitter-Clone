import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function ProfileTabs() {
  const [active, setActive] = useState("post");
  const navigate = useNavigate();

  const tabItems = [
    { name: "Posts", id: "post", slug: "" },
    { name: "Replies", id: "replies", slug: "replies" },
    { name: "Highlights", id: "highlights", slug: "highlights" },
    { name: "Aricles", id: "articles", slug: "articles" },
    { name: "Likes", id: "likes", slug: "likes" },
  ];

  return (
    <div className="flex h-12.5 w-full border-b border-[#2f3336] bg-black/75 backdrop-blur-[15px]">
      {tabItems.map((item) => (
        <NavLink
          to={item.slug}
          key={item.id}
          onClick={() => setActive(item.id)}
          className="flex flex-1 cursor-pointer items-center justify-center hover:bg-white/10"
        >
          <div
            className="relative inline-flex flex-col items-center"
            onClick={() => navigate(`/${item.slug}`)}
          >
            <span
              className={`text-[15px] font-semibold ${
                active === item.id ? "text-white" : "text-[rgb(113,118,123)]"
              }`}
            >
              {item.name}
            </span>

            {/* Active underline */}
            <div
              className={`absolute -bottom-3.75 h-0.75 w-full origin-left rounded-[10px] bg-cyan-400 transition-all duration-200 ease-in-out ${
                active === item.id
                  ? "scale-x-[1] opacity-100"
                  : "scale-x-[0] opacity-0"
              } `}
            />
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default ProfileTabs;
