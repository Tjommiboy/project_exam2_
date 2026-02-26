import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileUser";
import ProfileDetails from "../../components/ui/ProfileDetails";
import ProfileUpdateForm from "../../components/ui/ProfileUpdateForm";
import ProfileModal from "../../components/ui/ProfileUpdateModal";
import { authGuard } from "../../storage/authguard";
import { loadProfile } from "../../storage/loadProfile";
import { loadToken } from "../../storage/load";
import { getProfileVenues } from "../../api/getProfileVenues";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { getVenueBookings } from "../../api/getVenueBookings";
import { VenueDelete } from "../../api/VenueDelete";
import VenueList from "../../components/ui/VenueList";

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

  const handleDelete = async (venueId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmed) return;

    try {
      await VenueDelete(venueId);
      toast.success("Venue deleted successfully");
      fetchVenues();
    } catch (error) {
      console.error("Failed to delete venue", error);
      toast.error("Failed to delete venue");
    }
  };

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
      <ToastContainer autoClose={1000} />
      <div className="container mx-auto p-6 max-w-7xl">
        <ProfileDetails
          profile={profile}
          loading={loading}
          onEdit={() => setIsModalOpen(true)}
        />
        <ProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <h2 className="text-xl font-semibold mb-4 text-important">
            Edit Profile
          </h2>
          <ProfileUpdateForm profile={profile} onUpdate={handleUpdate} />
        </ProfileModal>
      </div>
      <VenueList
        venues={venues}
        selectedVenue={selectedVenue}
        bookings={bookings}
        onVenueClick={(venue) => {
          setSelectedVenue(venue);
          handleVenueClick(venue);
        }}
        onDelete={handleDelete}
        onBack={() => setSelectedVenue(null)}
      />
    </>
  );
};

export default VenueManager;
