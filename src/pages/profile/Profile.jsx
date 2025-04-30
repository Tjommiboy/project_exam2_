import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileUser";
import ProfileDetails from "../../components/ui/ProfileDetails";
import ProfileUpdateForm from "../../components/ui/ProfileUpdateForm";
import ProfileModal from "../../components/ui/ProfileUpdateModal";
import Spinner from "../../components/ui/Spinner";
import { loadProfile } from "../../storage/loadProfile";
import { loadToken } from "../../storage/loadProfile";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = loadToken();
  const profileData = loadProfile();
  const name = profileData?.name;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(name, token);

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
      }
    };
    fetchProfile();
  }, [name, token]);

  const handleUpdate = async (formData) => {
    const updatedData = {
      bio: formData.bio,
      avatar: { url: formData.avatar, alt: "User avatar" },
      banner: { url: formData.banner, alt: "User banner" },
    };
    const updated = await updateProfile(name, token, updatedData);
    setProfile(updated.data);
    setIsModalOpen(false);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <ProfileDetails profile={profile} />
      <button
        className="mt-4 px-4 py-2 bg-blue-400 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Profile
      </button>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <ProfileUpdateForm profile={profile} onUpdate={handleUpdate} />
      </ProfileModal>
    </div>
  );
};

export default Profile;
