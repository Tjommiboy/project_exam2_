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

const VenueManager = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venues, setVenues] = useState([]);

  const accessToken = loadToken();
  authGuard(accessToken);
  const profileData = loadProfile();
  const name = profileData?.name;

  // ✅ Extracted fetchVenues so we can reuse it
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
      <div className="container p-4">
        <h1 className="text-xl font-bold mb-2 text-[#2b615b]">My Profile</h1>

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

      <div className="container p-4">
        <div className="bg-amber-50 rounded shadow">
          <div className="flex justify-between">
            <h3 className=" font-bold text-[#2b615b] m-4 ">Venues</h3>
            <NavLink to="/createVenue">
              {({ isActive }) => (
                <Button
                  className="m-4"
                  variant={
                    isActive ? " profileDetailActive" : "profileDetailInactive"
                  }
                >
                  Create Venue
                </Button>
              )}
            </NavLink>
          </div>
          <div className="venue-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {venues.length === 0 ? (
              <p>No venues found.</p>
            ) : (
              venues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  showActions={true}
                  onDelete={fetchVenues} // ✅ Refresh venue list after deletion
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueManager;
