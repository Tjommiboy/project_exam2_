import React, { use } from "react";
import { useState, useEffect } from "react";
import { SINGLEVENUES } from "../../api/constants";
import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import {
  FaWifi,
  FaParking,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";

const SingleVenue = () => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [nights, setNights] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  const pricePerNight = venue?.data?.price || 0;
  const totalPrice = pricePerNight * nights;
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffTime = checkOut - checkIn;

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 0);
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
    <div className="flex min-h-screen">
      {loading ? (
        <Spinner />
      ) : venue ? (
        <div className="flex container justify-center m-auto gap-4">
          <div className="w-full max-w-[810px] bg-amber-50">
            <img
              src={venue.data.media?.[0]?.url}
              alt={venue.data.media?.[0]?.alt || venue.name}
              className="w-full h-[400px] object-cover rounded-t-lg mb-4"
            />
            <div className="p-4">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-3xl text-gray-700 font mb-2">
                    {venue.data.name.length > 20
                      ? venue.data.name.slice(0, 20) + "..."
                      : venue.data.name}
                  </h2>
                  <h3 className=" text-gray-500 ml-1 ">About Venue:</h3>
                  <p className=" text-gray-500 w-[500px]">
                    {venue.data.description}
                  </p>
                </div>
                <div>
                  <label
                    className="text-sm font-semibold text-gray-700 mb-2 mt-2"
                    htmlFor="Location"
                  >
                    Location:
                  </label>
                  <div className="flex justify-between mt-1">
                    <div className="text-gray-700 font-medium">
                      Country:
                      <p className="text-gray-500 font-light m-2">
                        {venue.data.location.country}
                      </p>
                    </div>
                    <div className="text-gray-700 font-medium">
                      City:
                      <p className="text-gray-500 font-light m-2">
                        {venue.data.location.city}
                      </p>
                    </div>
                  </div>
                  <label
                    className="text-sm font-semibold text-gray-700 mb-2 mt-2"
                    htmlFor="Max Guests"
                  >
                    Max Guests:
                  </label>
                  <div className="flex justify-between m-2">
                    <p className="text-gray-500">
                      Visitors: {venue.data.maxGuests}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-gray-700 mb-2 mt-2">
                    Amenities:
                  </p>
                  <ul className="flex text-sm text-gray-500">
                    <li className="m-2">
                      Wi-Fi:{" "}
                      {venue.data.meta.wifi ? (
                        <FaWifi className="text-lg text-green-500" />
                      ) : (
                        <FaRegTimesCircle className="text-lg text-red-500" />
                      )}
                    </li>
                    <li className="m-2">
                      Parking:{" "}
                      {venue.data.meta.parking ? (
                        <FaRegCheckCircle className="text-lg text-green-500" />
                      ) : (
                        <FaRegTimesCircle className="text-lg text-red-500" />
                      )}
                    </li>
                    <li className="m-2">
                      Breakfast:{" "}
                      {venue.data.meta.breakfast ? (
                        <FaRegCheckCircle className="text-lg text-green-500" />
                      ) : (
                        <FaRegTimesCircle className="text-lg text-red-500" />
                      )}
                    </li>
                    <li className="m-2">
                      Pets:{" "}
                      {venue.data.meta.pets ? (
                        <FaRegCheckCircle className="text-lg text-green-500" />
                      ) : (
                        <FaRegTimesCircle className="text-lg text-red-500" />
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
                    min={checkInDate}
                  />
                </div>
                <label
                  htmlFor="Guests"
                  className="block  text-gray-500 font-medium"
                >
                  Guests:
                </label>
                <input
                  type="number"
                  min="1"
                  max={venue.data.maxGuests} // <-- This makes sure users can't select more than allowed
                  placeholder="Guests"
                  className="border p-2 rounded text-gray-500 w-full"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
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
