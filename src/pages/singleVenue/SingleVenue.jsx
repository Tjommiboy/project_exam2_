import React, { use } from "react";
import { useState, useEffect } from "react";
import { SINGLEVENUES } from "../../api/constants";
import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";

const SingleVenue = () => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [nights, setNights] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const pricePerNight = venue?.data?.price || 0;
  const totalPrice = pricePerNight * nights;
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffTime = checkOut - checkIn;

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 0); // Prevent negative nights
    }
  }, [checkInDate, checkOutDate]);

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
    <div className="flex  min-h-screen">
      {loading ? (
        <Spinner />
      ) : venue ? (
        <div className="flex container justify-center m-auto gap-4">
          <div className="w-full max-w-[810px] bg-amber-50">
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
            <ul className="flextext-sm text-gray-500">
              <li>Wi-Fi: {venue.meta.wifi ? "✅" : "❌"}</li>
              <li>Parking: {venue.meta.parking ? "✅" : "❌"}</li>
              <li>Breakfast: {venue.meta.breakfast ? "✅" : "❌"}</li>
              <li>Pets: {venue.meta.pets ? "✅" : "❌"}</li>
            </ul>

            {/* Add more venue details as needed */}
          </div>
          <div className="bg-amber-50 flex justify-center  p-6 rounded-lg">
            <div className="bg-white p-6 rounded shadow-md w-80 text-sm">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 justify-center text-gray-500">
                  <input
                    type="date"
                    className="border p-2 rounded w-full"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="border p-2 rounded w-full"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </div>
                <input
                  type="number"
                  min="1"
                  placeholder="GUESTS"
                  className="border p-2 rounded text-gray-500 w-full"
                  defaultValue={2}
                />
                <div className="p-4 bg-amber-50 max-w-md mx-auto rounded">
                  <label
                    htmlFor="nights"
                    className="block mb-2 text-gray-500 font-medium"
                  >
                    Number of Nights:
                  </label>
                  <input
                    id="nights"
                    type="number"
                    min="1"
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded text-gray-500 p-2 mb-4"
                  />

                  <p className="flex justify-between text-gray-500">
                    ${pricePerNight} × {nights} night{nights > 1 ? "s" : ""}
                    <span className="font-medium text-gray-500">
                      ${totalPrice}
                    </span>
                  </p>

                  <p className="flex justify-between mt-2 text-gray-500">
                    Total:
                    <span className="font-bold">${totalPrice}</span>
                  </p>

                  <button className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800">
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Venue not found.</p>
      )}
    </div>
  );
};

export default SingleVenue;
