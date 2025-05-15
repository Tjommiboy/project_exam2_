import Spinner from "./Spinner";
import Button from "./Button";

const ProfileDetails = ({ profile, loading, onEdit }) => {
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
        <div>
          {" "}
          <button
            variant="ghost"
            className="bg-[#4E928A] text-white mt-48 px-4 py-2 rounded hover:bg-[#3d746e] m-2"
            onClick={onEdit}
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div>
        <p className="text-black">my info</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
