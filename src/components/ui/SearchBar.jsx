import React, { useState } from "react";
import { searchVenues } from "../../api/searchVenues";
// Make sure to import the searchVenues function if it's in another file
// import { searchVenues } from './path_to_your_searchVenues_function';

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
      // Check that the search query is not empty
      // Call the function that performs the search
      onSearch(searchQuery); // Use the passed 'onSearch' prop if needed
    } else {
      console.log("Please enter a search term.");
    }
  };

  return (
    <div className="w-full mx-auto max-w-sm min-w-[200px] mb-10">
      <div className="relative mt-2">
        {/* Flex container for the elements */}
        <div className="flex items-center space-x-4">
          {/* Filter Dropdown */}
          <button
            onClick={toggleDropdown}
            className="rounded bg-[#4E928A] border-[#4E928A] ml-2 text-bold"
          >
            <span>{selectedFilter}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex h-4 w-4 ml-1 text-amber-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 9.25-9.5 9.5-9.5-9.5"
              />
            </svg>
          </button>
          <div
            className={`min-w-[150px] border-[#4E928A] left-0 mt-10 ${
              isDropdownVisible ? "" : "hidden"
            } bg-white border rounded-md`}
          >
            <ul>
              <li
                onClick={() => handleFilterSelect("Location")}
                className="px-4 py-2 text-sm cursor-pointer text-[#4E928A]"
              >
                Location
              </li>
              <li
                onClick={() => handleFilterSelect("Price Range")}
                className="px-4 py-2 text-sm cursor-pointer text-[#4E928A]"
              >
                Price Range
              </li>
              <li
                onClick={() => handleFilterSelect("Availability")}
                className="px-4 py-2 text-sm cursor-pointer text-[#4E928A]"
              >
                Availability
              </li>
            </ul>
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInput}
            className="w-full bg-transparent placeholder:text-slate-400 text-[#4E928A] text-bold border border-[#4E928A] rounded-md px-4 py-2 transition duration-300"
            placeholder="Search venues..."
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center rounded bg-[#4E928A] py-1 px-2.5 text-white text-sm transition-all shadow-sm"
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
    </div>
  );
};

export default SearchBar;
