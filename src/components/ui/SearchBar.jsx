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
};
