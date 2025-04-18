import React, { useEffect, useState } from "react";
import { getAllVenues } from "../../api/allVenues";
import VenueCard from "../../components/ui/venueCard";

function Home() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const data = await getAllVenues();
        setVenues(data.data); // Assuming 'data' is the key where venue list is stored
      } catch (error) {
        setError(error.message);
      }
    }

    fetchVenues();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto justify-center px-4">
      <h1 className="mt-20 bg-amber-500 text-center text-1xl font-bold py-4 rounded">
        SearchBarrr
      </h1>
      {venues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-8">Loading venues...</p>
      )}
    </div>
  );
}

export default Home;
