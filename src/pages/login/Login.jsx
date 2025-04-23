import React, { useState } from "react";
import { loginUser } from "../../api/loginUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(formData);

      // ✅ Save the token and user data
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userName", response.name);
      localStorage.setItem("email", response.email);

      toast.success("Login was successful!", {
        onClose: () => (window.location.href = "/"),
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
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-gray-500">Login</h2>

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
