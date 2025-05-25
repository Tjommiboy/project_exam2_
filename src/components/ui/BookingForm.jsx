import React, { useState, useEffect } from "react";
import { createBooking } from "../../api/VenueCreate";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadProfile } from "../../storage/loadProfile";
import { useNavigate } from "react-router-dom";
import { loadToken } from "../../storage/load";

const BookingForm = ({ venueId, maxGuests, pricePerNight = 0, bookings }) => {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const today = getTodayDate();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const navigate = useNavigate();

  const totalPrice = nights * pricePerNight;

  useEffect(() => {
    const profile = loadProfile();
    setIsVenueManager(profile?.venueManager === true);
  }, []);

  useEffect(() => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkOut <= checkIn) {
      setCheckOutDate(addDays(checkInDate, 1));
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffTime = checkOut - checkIn;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 0);
    }
  }, [checkInDate, checkOutDate]);

  function isBookingAvailable(dateFrom, dateTo, bookings) {
    const newStart = new Date(dateFrom);
    const newEnd = new Date(dateTo);

    return !bookings.some((booking) => {
      const existingStart = new Date(booking.dateFrom);
      const existingEnd = new Date(booking.dateTo);
      return newStart < existingEnd && existingStart < newEnd;
    });
  }

  const bookedDateRanges =
    bookings?.map((booking) => ({
      start: new Date(booking.dateFrom),
      end: new Date(booking.dateTo),
    })) || [];

  const handleBooking = async () => {
    const token = loadToken();

    if (isVenueManager) {
      toast.error("Register a User Profile to book a venue");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to book a venue.");
      // const shouldLogin = window.confirm(
      //   "You must be logged in to book this venue. Do you want to log in now?"
      // );
      if (shouldLogin) {
        navigate("/login");
      }
      return;
    }

    const available = isBookingAvailable(checkInDate, checkOutDate, bookings);

    if (!available) {
      toast.error("Selected dates overlap with an existing booking.");
      return;
    }

    const bookingData = {
      dateFrom: checkInDate,
      dateTo: checkOutDate,
      guests,
      venueId,
    };

    try {
      await createBooking(bookingData);
      toast.success("Booking created successfully!");
      setTimeout(() => {
        navigate("/profile/");
      }, 1500);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking.");
    }
  };

  return (
    <div className="bg-amber-50 flex justify-center p-6 rounded-lg">
      <ToastContainer position="top-right" autoClose={2200} />
      <div className="bg-white p-6 rounded shadow-md w-80 text-sm">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 justify-center text-gray-500">
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={new Date()}
              excludeDateIntervals={bookedDateRanges}
              dateFormat="yyyy-MM-dd"
              placeholderText="Check-in"
              className="border p-2 rounded w-full"
            />

            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              excludeDateIntervals={bookedDateRanges}
              dateFormat="yyyy-MM-dd"
              placeholderText="Check-out"
              className="border p-2 rounded w-full"
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
              className={`mt-4 w-full text-white py-2 rounded ${
                isVenueManager
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-800"
              }`}
              onClick={handleBooking}
              disabled={isVenueManager}
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
