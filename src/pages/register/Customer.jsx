import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
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

    // Prepare the registration payload
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    // Include venueManager only when the user is registering as a venue manager
    if (userType === "venue") {
      payload.venueManager = true;
    }

    // Optional fields
    if (formData.bio) payload.bio = formData.bio;
    if (formData.avatarUrl || formData.avatarAlt) {
      payload.avatar = {
        url: formData.avatarUrl,
        alt: formData.avatarAlt,
      };
    }
    if (formData.bannerUrl || formData.bannerAlt) {
      payload.banner = {
        url: formData.bannerUrl,
        alt: formData.bannerAlt,
      };
    }

    try {
      // Step 1: Register the user (No token yet)
      const registerResponse = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const registerResult = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(
          registerResult.message || "Something went wrong during registration."
        );
      }

      // Step 2: Log in and get the access token
      const loginResponse = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const loginResult = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginResult.message || "Login failed.");
      }

      const accessToken = loginResult.accessToken;

      // After successful registration, login
      alert("Registration successful!");
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-center mb-4 ">
        <button
          onClick={() => setUserType("user")}
          className={`px-4 py-2 rounded-l text-gray-500 mr-2 ${
            userType === "user" ? "bg-[#4E928A] text-white" : "bg-gray-100"
          }`}
        >
          Regular User
        </button>
        <button
          onClick={() => setUserType("venue")}
          className={`px-4 py-2 rounded-r text-gray-500 ${
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
          className="block w-full mb-2 p-2 border rounded text-gray-500"
        />

        <textarea
          name="bio"
          placeholder="Bio (optional)"
          value={formData.bio}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded  text-gray-500"
        />

        <input
          name="avatarUrl"
          placeholder="Avatar URL"
          value={formData.avatarUrl}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded  text-gray-500"
        />
        <input
          name="avatarAlt"
          placeholder="Avatar Alt Text"
          value={formData.avatarAlt}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded  text-gray-500"
        />

        <input
          name="bannerUrl"
          placeholder="Banner URL"
          value={formData.bannerUrl}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded  text-gray-500"
        />
        <input
          name="bannerAlt"
          placeholder="Banner Alt Text"
          value={formData.bannerAlt}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border rounded  text-gray-500"
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
