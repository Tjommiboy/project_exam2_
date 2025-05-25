import React from "react";
import VenueCard from "./venueCard";

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <p>No venues found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
};

export default SearchResults;
