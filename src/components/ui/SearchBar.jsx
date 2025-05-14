import React, { useState } from "react";
import { searchVenues } from "../../api/searchVenues";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isDropdownVisible, setDropDownVisible] = useState(false);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setDropDownVisible(false);
  };

  const toggleDropdown = () => {
    setDropDownVisible(!isDropdownVisible);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    } else {
      console.log("Please enter a search term.");
    }
  };

  return (
    <div className="">
      <div className="flex gap-2 items-start relative">
        {/* Filter Dropdown Button and Menu */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 px-3 py-2 rounded bg-transparent text-[#4E928A] border border-[#4E928A] hover:bg-[#4E928A] hover:text-[#e0f2f1] "
          >
            <span>{selectedFilter || "Filter"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4 #4E928A"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 9.25-9.5 9.5-9.5-9.5"
              />
            </svg>
          </button>

          {isDropdownVisible && (
            <div className="absolute left-0 mt-1 min-w-[150px] bg-white border border-[#4E928A] rounded-md z-10 shadow">
              <ul>
                <li
                  onClick={() => handleFilterSelect("Location")}
                  className="px-4 py-2 text-sm cursor-pointer text-[#4E928A] hover:bg-[#f0fdfa]"
                >
                  Location
                </li>
                <li
                  onClick={() => handleFilterSelect("Price Range")}
                  className="px-4 py-2 text-sm cursor-pointer text-[#4E928A] hover:bg-[#f0fdfa]"
                >
                  Price Range
                </li>
                <li
                  onClick={() => handleFilterSelect("Availability")}
                  className="px-4 py-2 text-sm cursor-pointer text-[#4E928A] hover:bg-[#f0fdfa]"
                >
                  Availability
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInput}
            className="w-[500px] bg-transparent placeholder:text-[#4E928A] text-[#4E928A] font-semibold border border-[#4E928A] rounded-md px-4 py-2 transition duration-300"
            placeholder="Search venues..."
          />

          <button
            onClick={handleSearch}
            className="flex items-center gap-1 roundedbg-transparent text-[#4E928A] border border-[#4E928A] hover:bg-[#4E928A] hover:text-[#e0f2f1]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
