import React, { useState, useEffect } from "react";
import { createBooking } from "../../api/CreateBooking";
import { toast, ToastContainer } from "react-toastify";

const BookingForm = ({ venueId, maxGuests, pricePerNight = 0 }) => {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const addDays = (dateStr, days) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const today = getTodayDate();

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(today, 1);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);

  const totalPrice = nights * pricePerNight;

  useEffect(() => {
    if (checkOutDate <= checkInDate) {
      setCheckOutDate(addDays(checkInDate, 1));
    }
  }, [checkInDate]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffTime = checkOut - checkIn;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 0);
    }
  }, [checkInDate, checkOutDate]);

  const handleBooking = async () => {
    const bookingData = {
      dateFrom: checkInDate,
      dateTo: checkOutDate,
      guests,
      venueId,
    };

    console.log("Booking payload:", bookingData);
    console.log("venueId:", venueId);
    try {
      await createBooking(bookingData);
      toast.success("Booking created successfully!");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking.");
    }
  };

  return (
    <div className="bg-amber-50 flex justify-center p-6 rounded-lg">
      <ToastContainer position="top-right" autoClose={1500} />
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

          <label htmlFor="Guests" className="text-gray-500 font-medium">
            Guests:
          </label>
          <input
            type="number"
            min="1"
            max={maxGuests}
            placeholder="Guests"
            className="border p-2 rounded text-gray-500 w-full"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />

          <div className="p-4 bg-amber-50 max-w-md mx-auto rounded">
            <p className="flex justify-between text-gray-500 gap-10">
              ${pricePerNight} × {nights} night{nights > 1 ? "s" : ""}
              <span className="font-medium">${totalPrice}</span>
            </p>

            <p className="flex justify-between mt-2 text-gray-500">
              Total: <span className="font-bold">${totalPrice}</span>
            </p>

            <button
              className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
              onClick={handleBooking}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
