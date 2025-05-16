import { use, useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileUser";
import ProfileDetails from "../../components/ui/ProfileDetails";
import ProfileUpdateForm from "../../components/ui/ProfileUpdateForm";
import ProfileModal from "../../components/ui/ProfileUpdateModal";
import { authGuard } from "../../storage/authguard";
import { loadProfile } from "../../storage/loadProfile";
import { loadToken } from "../../storage/load";
import { getProfileVenues } from "../../api/getProfileVenues";
import VenueCard from "../../components/ui/venueCard";

const VenueManager = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venues, setVenues] = useState([]);

  const accessToken = loadToken();
  authGuard(accessToken);
  const profileData = loadProfile();
  const name = profileData?.name;

  useEffect(() => {
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
      console.log("Update result:", updated);

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
      <div className="venue-list grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {venues.length === 0 ? (
          <p>No venues found.</p>
        ) : (
          venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
        )}
      </div>
    </>
  );
};

export default VenueManager;
