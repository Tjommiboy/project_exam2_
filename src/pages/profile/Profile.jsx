import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileUser";
import ProfileDetails from "../../components/ui/ProfileDetails";
import ProfileUpdateForm from "../../components/ui/ProfileUpdateForm";
import ProfileModal from "../../components/ui/ProfileUpdateModal";
import { authGuard } from "../../storage/authguard";
import { loadProfile } from "../../storage/loadProfile";
import { loadToken } from "../../storage/load";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessToken = loadToken();
  authGuard(accessToken);
  const profileData = loadProfile();
  const name = profileData?.name;

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
    <div className="container p-4 bg-yellow-100">
      <h1 className="text-xl font-bold mb-2 text-[#2b615b]">My Profile</h1>
      <ProfileDetails profile={profile} loading={loading} />

      <button
        className="mt-4 px-4 py-2 bg-blue-400 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Profile
      </button>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-[#2b615b]">
          Edit Profile
        </h2>
        <ProfileUpdateForm profile={profile} onUpdate={handleUpdate} />
      </ProfileModal>
    </div>
  );
};

export default Profile;
