const ProfileDetails = ({ profile }) => {
  return (
    <div className="bg-amber-100 p-4 rounded shadow">
      <img
        src={profile.avatar?.url}
        alt={profile.avatar?.alt || "Avatar"}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-xl font-bold text-black">{profile.name}</h2>
      <p className="text-black">{profile.bio}</p>
    </div>
  );
};

export default ProfileDetails;
