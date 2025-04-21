import React, { use } from "react";
import { useState, useEffect } from "react";
import { SINGLEVENUES } from "../../api/constants";
import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";

const SingleVenue = () => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`${SINGLEVENUES}/${id}`);
        const data = await response.json();
        console.log(data);
        setVenue(data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : venue ? (
        <div className="container">
          <div className="w-full max-w-[810px] mx-auto bg-amber-50">
            <img
              src={venue.data.media?.[0]?.url}
              alt={venue.data.media?.[0]?.alt || venue.name}
              className="w-full max-w-md rounded mb-4"
            />
            <h2 className="text-gray-700 font mb-2 ">{venue.data.name}</h2>
            <p className="text-gray-500">{venue.data.description}</p>
            <p className="text-gray-500">{venue.data.maxGuests}</p>
            <p className="text-gray-500">{venue.data.location.city}</p>
            <p className="text-gray-500">{venue.data.location.country}</p>
            <p className="text-gray-500">{venue.data.price}</p>
            <p className="text-gray-500">{venue.data.rating}</p>
            <p className="text-gray-500">{venue.data.reviews}</p>
            <ul className="text-sm text-gray-500">
              <li>Wi-Fi: {venue.meta.wifi ? "✅" : "❌"}</li>
              <li>Parking: {venue.meta.parking ? "✅" : "❌"}</li>
              <li>Breakfast: {venue.meta.breakfast ? "✅" : "❌"}</li>
              <li>Pets: {venue.meta.pets ? "✅" : "❌"}</li>
            </ul>

            {/* Add more venue details as needed */}
          </div>
          <div className="bg-amber-50"></div>
        </div>
      ) : (
        <p>Venue not found.</p>
      )}
    </div>
  );
};

export default SingleVenue;
