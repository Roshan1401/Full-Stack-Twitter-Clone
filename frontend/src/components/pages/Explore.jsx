import { FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserAvatar from "../common/UserAvatar";
import { useApi } from "../../hooks/useApi.js";
import { userProfileRefetch } from "../../hooks/userProfileRefetch.js";
import Search from "../common/Search.jsx";
function Explore() {
  const [search, setSearch] = useState("");
  return (
    <div className="px-5 py-2">
      <Search />
    </div>
  );
}

export default Explore;
