import React, { useEffect, useState } from "react";
import { profileBookings } from "../../api/ProfileBooking";
import VenueCard from "./venueCard";
import { bookingDelete } from "../../api/bookingDelete";
import { toast, ToastContainer } from "react-toastify";

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

  const handleDeleteBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmed) return;

    try {
      await bookingDelete(bookingId);
      // Remove deleted booking from local state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Failed to delete booking:", error);
      alert("Failed to delete booking. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p>You have no bookings yet.</p>;
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} />
      <div>
        <h2 className="text-xl font-bold mb-2 text-[#4E928A] mt-8">
          {" "}
          Bookings
        </h2>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <VenueCard
              venue={booking.venue}
              booking={booking}
              showActions={true}
              cardType="booking"
              onDelete={() => handleDeleteBooking(booking.id)} // pass booking.id
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
