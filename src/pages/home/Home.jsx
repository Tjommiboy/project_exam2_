import React, { useEffect, useState } from "react";
import { getAllVenues } from "../../api/allVenues";
import VenueCard from "../../components/ui/venueCard";
import Spinner from "../../components/ui/Spinner";
import { searchVenues } from "../../api/searchVenues";
import SearchBar from "../../components/ui/SearchBar";
import { debounce } from "lodash";

function Home() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true);
      try {
        const data = await getAllVenues(currentPage, limit);
        setVenues(data.data);
        const totalItems = data.meta.totalCount;
        setTotalPages(Math.ceil(totalItems / limit));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [currentPage]);

  const handleSearch = async (query) => {
    setSearchLoading(true); // Show loading for search
    try {
      const results = await searchVenues(query);
      setVenues(results); // Update state with search results
    } catch (error) {
      setError(error.message);
    } finally {
      setSearchLoading(false); // Hide search loading
    }
  };

  // Debounced search handler
  const debouncedSearch = debounce(handleSearch, 500);

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto justify-center px-4">
      <div className="flex justify-center">
        <SearchBar onSearch={debouncedSearch} />
      </div>

      {loading && !searchLoading ? (
        <div className="flex justify-center mt-8">
          <Spinner loading={loading} />
        </div>
      ) : searchLoading ? (
        <div className="flex justify-center mt-8">
          <Spinner loading={searchLoading} />
        </div>
      ) : venues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-8">No venues found.</p>
      )}
      <div className="flex justify-center flex-wrap gap-2 mt-8  ">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p border rounded hover:bg-[#4E928A] hover:text-white"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(currentPage - 5, 0),
            Math.min(currentPage + 4, totalPages)
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-[#4E928A] text-white"
                  : "hover:bg-[#e0f2f1] hover:text-[#4E928A]"
              }`}
            >
              {page}
            </button>
          ))}

        {/* Next button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className=" border rounded hover:bg-[#4E928A] hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
