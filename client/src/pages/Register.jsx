import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-indigo-600 px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">

        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        {error && (
          <div className="bg-red-500/80 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-white text-indigo-700 font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
