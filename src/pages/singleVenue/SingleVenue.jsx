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
import BookingForm from "../../components/ui/BookingForm";

const SingleVenue = () => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    if (venue?.data?.media?.length > 0) {
      setImageIndex((prevIndex) => (prevIndex + 1) % venue.data.media.length);
    }
  };

  const prevImage = () => {
    if (venue?.data?.media?.length > 0) {
      setImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + venue.data.media.length) % venue.data.media.length
      );
    }
  };

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`${SINGLEVENUES}/${id}?_bookings=true`);
        const data = await response.json();
        console.log("Fetched venue with bookings:", data);
        setVenue(data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  return (
    <div className="flex min-h-screen">
      {loading ? (
        <Spinner />
      ) : venue ? (
        <div className="flex container justify-center m-auto gap-4">
          <div className="w-full max-w-[810px] bg-amber-50">
            <div className="relative w-full h-[400px]">
              <img
                src={venue.data.media?.[imageIndex]?.url}
                alt={venue.data.media?.[imageIndex]?.alt || venue.name}
                className="w-full h-full object-cover rounded-t-lg"
              />

              {venue?.data?.media?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/40 hover:bg-white/50 p-1 rounded-full"
                  >
                    ‹
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/40 hover:bg-white/50 p-1 rounded-full"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
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
          <BookingForm
            venueId={venue.data.id}
            maxGuests={venue.data.maxGuests}
            pricePerNight={venue.data.price}
            bookings={venue.data.bookings}
          />
        </div>
      ) : (
        <p>Venue not found.</p>
      )}
    </div>
  );
};

export default SingleVenue;
