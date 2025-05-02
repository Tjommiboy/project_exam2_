import Spinner from "./Spinner";

const ProfileDetails = ({ profile, loading }) => {
  if (loading || !profile || !profile.avatar) {
    return (
      <div className="flex justify-center mt-8">
        <Spinner loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex bg-amber-50 rounded-bl-[100px] rounded-tr-[100px] shadow">
        <img
          src={profile.avatar?.url}
          alt={profile.avatar?.alt || "Avatar"}
          className="w-46 h-60 rounded-bl-[100px]"
        />
        <div className="m-4">
          <h2 className="text-xl font-bold text-black">{profile.name}</h2>
          <p className="text-black w-90">{profile.bio}</p>
        </div>
      </div>
      <div>
        <p className="text-black">my info</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
