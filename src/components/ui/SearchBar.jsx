import React, { useState } from "react";

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
    inSearch(searchQuery);
  };

  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="relative mt-2">
        {/* Filter Dropdown */}
        <div className="absolute top-1 left-1 flex items-center">
          <button
            onClick={toggleDropdown}
            className="rounded border py-1 px-1.5 text-sm"
          >
            <span>{selectedFilter}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4 ml-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div
            className={`min-w-[150px] absolute left-0 mt-10 ${
              isDropdownVisible ? "" : "hidden"
            } bg-white border rounded-md`}
          >
            <ul>
              <li
                onClick={() => handleFilterSelect("Location")}
                className="px-4 py-2 text-sm cursor-pointer"
              >
                Location
              </li>
              <li
                onClick={() => handleFilterSelect("Price Range")}
                className="px-4 py-2 text-sm cursor-pointer"
              >
                Price Range
              </li>
              <li
                onClick={() => handleFilterSelect("Availability")}
                className="px-4 py-2 text-sm cursor-pointer"
              >
                Availability
              </li>
            </ul>
          </div>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInput}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-28 py-2 transition duration-300"
          placeholder="Search venues..."
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 text-white text-sm transition-all shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 mr-1.5"
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
