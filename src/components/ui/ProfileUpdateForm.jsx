import { useState } from "react";

const ProfileUpdateForm = ({ profile, onUpdate }) => {
  const [bio, setBio] = useState(profile.bio || "");
  const [avatar, setAvatar] = useState(profile.avatar?.url || "");
  const [banner, setBanner] = useState(profile.banner?.url || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ bio, avatar, banner });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Avatar URL</label>
        <input
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Banner URL</label>
        <input
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
