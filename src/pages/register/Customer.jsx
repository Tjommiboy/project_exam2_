import React, { useState } from "react";
import { registerUser } from "../../api/registerUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userType, setUserType] = useState("user"); // "user" or "venue"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

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
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <ToastContainer position="top-center" autoClose={3000} />
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
        <h2 className="text-xl font-bold mb-4 text-gray-500 placeholder-gray-100">
          {userType === "venue" ? "Venue Manager" : "User"} Registration
        </h2>

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
          pattern="^(?=.*\d).{8,}$"
          title="Password must be at least 8 characters long and include at least one number."
          className="block w-full mb-2 p-2 border rounded text-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading
            ? "Registering..."
            : "Register as " +
              (userType === "venue" ? "Venue Manager" : "User")}
        </button>

        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
