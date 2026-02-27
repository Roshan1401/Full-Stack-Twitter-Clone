import { FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserAvatar from "./UserAvatar.jsx";
import { useApi } from "../../hooks/useApi.js";
import { userProfileRefetch } from "../../hooks/userProfileRefetch.js";
function Search({ className }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { request } = useApi();
  const handleSearch = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    setSearchResults([]);
    const delayDebounceFn = setTimeout(() => {
      const searchUsers = async () => {
        try {
          const data = await request("GET", `/search/users?query=${search}`);
          setSearchResults(data);
        } catch (error) {
          console.error("Error searching users:", error);
        }
      };

      if (search.trim() !== "") {
        searchUsers();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, request]);
  return (
    <div>
      <div
        className={`${className} flex items-center gap-2.5 rounded-full bg-[#202327] px-3.75 py-3 text-white`}
      >
        <FiSearch />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 border-none bg-transparent text-[0.9375rem] font-normal text-white outline-none"
        />
      </div>
      {search.trim() !== "" && (
        <div className="rounded-lg border border-t-0 border-[#2f3336] bg-black">
          <div className="flex flex-col py-5">
            <p className="text-center text-sm text-neutral-400">
              Search People
            </p>
            <div className="mt-5">
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <Link
                    to={`/profile/${user.username}`}
                    key={user._id}
                    className="flex cursor-pointer gap-4 px-4 py-3 hover:bg-neutral-900"
                  >
                    <UserAvatar user={user} />
                    <div className="flex flex-col text-white">
                      <span className="text-md font-semibold">{user.name}</span>
                      <span className="text-sm text-[gray]">
                        @{user.username}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-sm text-neutral-400">
                  No users found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
