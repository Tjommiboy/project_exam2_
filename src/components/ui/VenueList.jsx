import { NavLink } from "react-router-dom";
import Button from "./Button";
import VenueCard from "./venueCard";

const VenueList = ({
  venues,
  selectedVenue,
  bookings,
  onVenueClick,
  onDelete,
  onBack,
}) => {
  return (
    <div className="w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-amber-50 rounded shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
          <h3 className="font-bold text-[#4E928A] text-xl mb-4 sm:mb-0">
            Venues
          </h3>
          <NavLink to="/createVenue" className="w-full sm:w-auto">
            {({ isActive }) => (
              <Button
                className="w-full sm:w-auto bg-[#4E928A] text-white rounded hover:bg-[#3d746e]"
                variant={
                  isActive ? "profileDetailActive" : "profileDetailInactive"
                }
              >
                Create Venue
              </Button>
            )}
          </NavLink>
        </div>

        {selectedVenue ? (
          <div className="p-6">
            <button
              className="mb-4 text-[#4E928A] hover:underline text-sm"
              onClick={onBack}
            >
              ← Back to venues
            </button>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="bg-white rounded shadow p-4 flex-shrink-0 lg:w-1/2">
                <img
                  src={
                    selectedVenue.media?.[0]?.url ||
                    "https://images.unsplash.com/photo-1678225105802-01949b1dff0d"
                  }
                  alt={selectedVenue.media?.[0]?.alt || selectedVenue.name}
                  className="w-full h-64 sm:h-80 object-cover rounded mb-4"
                />
                <h2 className="text-2xl font-bold text-[#2b615b]">
                  {selectedVenue.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  {selectedVenue.location.city},{" "}
                  {selectedVenue.location.country}
                </p>
                <p className="text-gray-700 mb-4 max-w-md">
                  {selectedVenue.description}
                </p>
                <p className="text-sm text-gray-500">
                  ⭐ {selectedVenue.rating} • {selectedVenue.reviews} reviews •
                  👥 {selectedVenue.maxGuests} guests
                </p>
                <p className="text-lg text-[#2b615b] mt-2">
                  Price: ${selectedVenue.price}
                </p>
              </div>

              <div className="mt-6 lg:mt-0 lg:w-1/2">
                {bookings.length > 0 ? (
                  <>
                    <h3 className="text-lg font-semibold text-[#2b615b] mb-2">
                      Bookings for this venue:
                    </h3>
                    <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                      {bookings.map((booking) => (
                        <li
                          key={booking.id}
                          className="bg-amber-500 p-3 rounded shadow-sm text-sm"
                        >
                          🗓️ From{" "}
                          <strong>
                            {new Date(booking.dateFrom).toLocaleDateString()}
                          </strong>{" "}
                          to{" "}
                          <strong>
                            {new Date(booking.dateTo).toLocaleDateString()}
                          </strong>{" "}
                          • Guests: <strong>{booking.guests}</strong>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-gray-600">
                    No bookings for this venue.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="venue-list grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {venues.length === 0 ? (
              <p className="text-center w-full">No venues found.</p>
            ) : (
              venues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  showActions={true}
                  disableLink={true}
                  onDelete={() => onDelete(venue.id)}
                  onClick={() => onVenueClick(venue)}
                  onEdit={(venue) => onVenueClick(venue)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueList;
