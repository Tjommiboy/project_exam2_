import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/loginUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { save } from "../../storage/save";
import { getProfile } from "../../api/profileUser";
import { FiInfo } from "react-icons/fi";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(formData);

      const accessToken = response.data.accessToken;
      const name = response.data.name;

      save("accessToken", accessToken);

      const profileResponse = await getProfile(name, accessToken);
      const profileData = profileResponse.data;

      save("profile", {
        name: profileData.name,
        email: profileData.email,
        avatar: profileData.avatar,
        venueManager: profileData.venueManager,
      });

      window.dispatchEvent(new Event("authChange"));

      toast.success("Login was successful!", {
        onClose: () => {
          if (profileData.venueManager) {
            navigate("/VenueManager");
          } else {
            navigate("/profile");
          }
        },
      });
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <ToastContainer autoClose={1000} />
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-[#4E928A]">Login</h2>
        <span className="flex items-center text-sm text-gray-500 mb-1">
          <FiInfo className="mr-1" /> Take note: Only @stud.noroff.no e-mails
          are supported
        </span>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full mb-2 p-2 border rounded text-gray-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          pattern="^(?=.*\d).{8,}$"
          title="Password must be at least 8 characters long and include at least one number."
          className="block w-full mb-2 p-2 border rounded text-gray-500"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
