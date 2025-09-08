import React, { useState } from "react";
import { registerUser } from "../../api/registerUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiInfo } from "react-icons/fi";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userType, setUserType] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateUsername = (name) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(name);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validateUsername(formData.name)) {
      toast.error(
        "Username must be 3–20 characters long and contain only letters, numbers, or underscores."
      );
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters and contain at least one number."
      );
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    if (userType === "venue") {
      payload.venueManager = true;
    }

    try {
      await registerUser(payload);
      toast.success("Registration successful!", {
        onClose: () => (window.location.href = "/login"),
      });
    } catch (error) {
      // Show custom errors based on the API message
      const message = error.message.toLowerCase();
      let displayMessage = "Registration failed.";

      if (message.includes("name")) {
        displayMessage = "Username is already taken.";
      } else if (message.includes("email")) {
        displayMessage = "Email is already registered.";
      } else {
        displayMessage = error.message;
      }

      toast.error(displayMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="flex justify-center mb-4 ">
        <button
          onClick={() => setUserType("user")}
          className={`px-4 py-2 rounded-l text-[#4E928A] mr-2 ${
            userType === "user" ? "bg-[#4E928A] text-white" : "bg-gray-100"
          }`}
        >
          Regular User
        </button>
        <button
          onClick={() => setUserType("venue")}
          className={`px-4 py-2 rounded-r text-[#4E928A] ${
            userType === "venue" ? "bg-[#4E928A] text-white" : "bg-gray-200"
          }`}
        >
          Venue Manager
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-bold mb-4 text-[#4E928A] placeholder-gray-100">
          {userType === "venue" ? "Venue Manager" : "User"} Registration
        </h3>
        <span className="flex items-center text-sm text-gray-500 mb-1">
          <FiInfo className="mr-1" /> Only yourname@stud.noroff.no e-mails are
          supported
        </span>
        <input
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full mb-2 p-2 border rounded text-gray-500"
        />

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
          className="block w-full mb-4 p-2 border rounded text-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition duration-700 ease-in-out"
        >
          {loading
            ? "Registering..."
            : "Register as " +
              (userType === "venue" ? "Venue Manager" : "User")}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
