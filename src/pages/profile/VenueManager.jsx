import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileUser";
import ProfileDetails from "../../components/ui/ProfileDetails";
import ProfileUpdateForm from "../../components/ui/ProfileUpdateForm";
import ProfileModal from "../../components/ui/ProfileUpdateModal";
import { authGuard } from "../../storage/authguard";
import { loadProfile } from "../../storage/loadProfile";
import { loadToken } from "../../storage/load";
import { getProfileVenues } from "../../api/getProfileVenues";
import VenueCard from "../../components/ui/venueCard";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import Button from "../../components/ui/Button";
import { getVenueBookings } from "../../api/getVenueBookings";

const VenueManager = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookings, setBookings] = useState([]);

  const accessToken = loadToken();
  authGuard(accessToken);
  const profileData = loadProfile();
  const name = profileData?.name;

  const fetchVenues = async () => {
    try {
      const data = await getProfileVenues(name, accessToken);
      if (data && data.data) {
        setVenues(data.data);
      } else {
        console.error(
          "Venues fetch failed or returned unexpected structure:",
          data
        );
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [name, accessToken]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(name, accessToken);
        if (data && data.data) {
          setProfile(data.data);
        } else {
          console.error(
            "Profile fetch failed or returned unexpected structure:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [name, accessToken]);

  const fetchBookingsForVenue = async (venueId) => {
    try {
      const bookings = await getVenueBookings(venueId);
      if (bookings && bookings.length > 0) {
        setBookings(bookings);
      } else {
        console.warn("No bookings found for venue", venueId);
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      setBookings([]);
    }
  };

  const handleVenueClick = (venue) => {
    if (!venue || !venue.id) {
      console.warn("handleVenueClick called without a valid venue", venue);
      return;
    }
    setSelectedVenue(venue);
    fetchBookingsForVenue(venue.id);
  };

  const handleUpdate = async (formData) => {
    const updatedData = {
      bio: formData.bio || "",
      avatar: {
        url: formData.avatar || "",
        alt: "User avatar",
      },
      banner: {
        url: formData.banner || "",
        alt: "User banner",
      },
    };

    try {
      const updated = await updateProfile(name, accessToken, updatedData);
      if (updated.errors) {
        console.error("Update failed:", updated.errors);
        alert("Update failed: " + updated.errors[0]?.message);
        return;
      }

      setProfile(updated.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update error:", error);
      alert("Update error: " + error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-4 max-w-7xl">
        <ProfileDetails
          profile={profile}
          loading={loading}
          onEdit={() => setIsModalOpen(true)}
        />
        <ProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <h2 className="text-xl font-semibold mb-4 text-[#2b615b]">
            Edit Profile
          </h2>
          <ProfileUpdateForm profile={profile} onUpdate={handleUpdate} />
        </ProfileModal>
      </div>

      <div className="container mx-auto p-4 max-w-7xl">
        <div className="bg-amber-50 rounded shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
            <h3 className="font-bold text-[#2b615b] text-xl mb-4 sm:mb-0">
              Venues
            </h3>
            <NavLink to="/createVenue" className="w-full sm:w-auto">
              {({ isActive }) => (
                <Button
                  className="w-full sm:w-auto bg-[#4E928A] text-white rounded hover:bg-[#3d746e] "
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
                onClick={() => setSelectedVenue(null)}
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
                    ⭐ {selectedVenue.rating} • {selectedVenue.reviews} reviews
                    • 👥 {selectedVenue.maxGuests} guests
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
                    onDelete={fetchVenues}
                    onClick={() => {
                      setSelectedVenue(venue);
                      handleVenueClick(venue);
                    }}
                    onEdit={(venue) => {
                      setSelectedVenue(venue);
                    }}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VenueManager;
