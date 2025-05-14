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

  // useEffect(() => {
  //   // Fetch all venues on initial load
  //   async function fetchVenues() {
  //     try {
  //       const data = await getAllVenues();
  //       setVenues(data.data); // Adjust this if the actual key differs
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchVenues();
  // }, []);

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
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-transparent text-[#4E928A] border border-[#4E928A] hover:bg-[#4E928A] hover:text-[#e0f2f1] "
        >
          Previous
        </button>

        <span className="self-center text-[#4E928A] ">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-transparent text-[#4E928A] border border-[#4E928A] hover:bg-[#4E928A] hover:text-[#e0f2f1] "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
