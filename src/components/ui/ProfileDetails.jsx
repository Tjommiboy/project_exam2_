import Spinner from "./Spinner";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const ProfileDetails = ({ profile, loading, onEdit }) => {
  if (loading || !profile || !profile.avatar) {
    return (
      <div className="flex justify-center mt-8">
        <Spinner loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full md:w-1/2 ">
        <div className="flex flex-col md:flex-row bg-amber-50 rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px]  md:rounded-tr-[20px] md:rounded-tl-[20px] md:rounded-br-[20px]  rounded-tr-[100px] shadow">
          <img
            src={profile.avatar?.url}
            alt={profile.avatar?.alt || "Avatar"}
            className="
        w-full h-60 object-cover
        rounded-tr-[20px] rounded-tl-[20px] md:rounded-tr-none 
        md:w-1/2 md:h-auto 
        md:rounded-bl-[20px]
        md:rounded-tl-[20px]
      "
          />
          <div className="flex flex-col justify-between p-4 md:w-1/2">
            <div>
              <h2 className="text-xl font-bold text-black">{profile.name}</h2>
              <p className="text-black mb-2">{profile.bio}</p>
            </div>
            <div className="flex justify-end">
              <button
                variant="ghost"
                className="bg-[#4E928A] text-white rounded hover:bg-[#3d746e] mt-2"
                onClick={onEdit}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
