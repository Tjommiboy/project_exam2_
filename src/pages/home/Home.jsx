import React, { useEffect, useState } from "react";
import { getAllVenues } from "../../api/allVenues";
import VenueCard from "../../components/ui/venueCard";
import Spinner from "../../components/ui/Spinner";

function Home() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const data = await getAllVenues();
        setVenues(data.data); // Adjust this if the actual key differs
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto justify-center px-4">
      <h1 className="mt-20 bg-amber-500 text-center text-1xl font-bold py-4 rounded">
        SearchBar
      </h1>

      {loading ? (
        <div className="flex justify-center mt-8">
          <Spinner loading={loading} />
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
    </div>
  );
}

export default Home;
