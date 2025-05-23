import React, { useState } from "react";
import { searchVenues } from "../../api/searchVenues";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isDropdownVisible, setDropDownVisible] = useState(false);
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearchInput = (e) => setSearchQuery(e.target.value);
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setDropDownVisible(false);
  };
  const toggleDropdown = () => setDropDownVisible(!isDropdownVisible);
  const toggleMobileSearch = () => setMobileSearchOpen(!isMobileSearchOpen);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") onSearch(searchQuery);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    } else {
      console.log("Please enter a search term.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end md:hidden px-4 mb-2">
        <button
          onClick={toggleMobileSearch}
          className="text-[#4E928A]  p-2 rounded"
        >
          ☰
        </button>
      </div>

      {/* Search Bar - Mobile View */}
      {isMobileSearchOpen && (
        <div className="flex flex-col gap-2 md:hidden">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between px-3 py-2 rounded bg-transparent text-[#4E928A] border border-[#4E928A] hover:bg-[#4E928A] hover:text-[#e0f2f1] w-full"
            >
              <span>{selectedFilter || "Filter"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4"
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
                  {["Location", "Price Range", "Availability"].map((filter) => (
                    <li
                      key={filter}
                      onClick={() => handleFilterSelect(filter)}
                      className="px-4 py-2 text-sm cursor-pointer text-[#4E928A] hover:bg-[#f0fdfa]"
                    >
                      {filter}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
            className="bg-transparent placeholder:text-[#4E928A] text-[#4E928A] font-semibold border border-[#4E928A] rounded-md px-4 py-2"
            placeholder="Search venues..."
          />

          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-1 text-[#4E928A] border border-[#4E928A] hover:bg-[#4E928A] hover:text-[#e0f2f1] px-4 py-2 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-4 h-4"
              viewBox="0 0 16 16"
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
      )}

      {/* Search Bar - Desktop View */}
      <div className="hidden md:flex items-center justify-center gap-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 px-3 py-2 rounded bg-transparent text-[#4E928A] border border-[#4E928A] hover:bg-[#4E928A] hover:text-[#e0f2f1]"
          >
            <span>{selectedFilter || "Filter"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
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
                {["Location", "Price Range", "Availability"].map((filter) => (
                  <li
                    key={filter}
                    onClick={() => handleFilterSelect(filter)}
                    className="px-4 py-2 text-sm cursor-pointer text-[#4E928A] hover:bg-[#f0fdfa]"
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown}
          className="w-[500px] bg-transparent placeholder:text-[#4E928A] text-[#4E928A] font-semibold border border-[#4E928A] rounded-md px-4 py-2"
          placeholder="Search venues..."
        />

        <button
          onClick={handleSearch}
          className="flex items-center gap-1 px-4 py-2 text-[#4E928A] border border-[#4E928A] hover:bg-[#4E928A] hover:text-[#e0f2f1] rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-4 h-4"
            viewBox="0 0 16 16"
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
  );
};

export default SearchBar;
