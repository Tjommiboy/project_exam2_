import React, { useEffect, useState } from "react";
import { profileBookings } from "../../api/ProfileBooking"; // adjust path if needed

export default function ProfileBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      const data = await profileBookings();
      setBookings(data);
      setLoading(false);
    }

    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p>You have no bookings yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#4E928A]">Bookings</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 text-[#4E928A]">
        {bookings.map((booking) => {
          const venue = booking.venue;

          return (
            <li key={booking.id} className="p-4 border rounded shadow">
              <img
                src={
                  venue?.media?.[0]?.url || "https://via.placeholder.com/300"
                }
                alt={venue?.media?.[0]?.alt || "Venue image"}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">
                {venue?.name || "Unknown venue"}
              </h3>
              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>
              <p>
                <strong>From:</strong>{" "}
                {new Date(booking.dateFrom).toLocaleDateString()}
              </p>
              <p>
                <strong>To:</strong>{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>
              <p>
                <strong>Location:</strong> {venue?.location?.city},{" "}
                {venue?.location?.country}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
