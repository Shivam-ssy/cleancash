import React, { useState } from "react";
import axiosInstance from "../config/axiosInstance.js";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (activeTab === "signin") {
        // Login API Call
        const response = await axiosInstance.post("/users/login", {
          email,
          password,
        });
        navigate('/dashboard')
        console.log("Login Successful:", response.data);
        
      } else {
        // Signup API Call
        const response = await axiosInstance.post("/users/register", {
          name,
          email,
          password,
        });
        console.log("Signup Successful:", response.data);
        setActiveTab("signin"); // Redirect to Sign In after successful signup
      }
    } catch (error) {
      console.error("Auth Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Cosmic Background */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-gray-900/90 z-10"></div>
        <img src="/heroImg.jpg" alt="Cosmic background" className="w-full h-full object-cover" />
      </div>

      {/* Auth Container */}
      <div className="max-w-md w-full mx-auto -mt-32 z-20 px-4">
        <div className="bg-purple-900/80 backdrop-blur-md rounded-lg p-8 shadow-lg border border-white/10">
          {/* Tabs */}
          <div className="flex mb-6 border-b border-white/20">
            <button
              className={`flex-1 pb-3 font-medium ${
                activeTab === "signin" ? "text-white border-b-2 border-green-500" : "text-white/70"
              }`}
              onClick={() => setActiveTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 pb-3 font-medium ${
                activeTab === "signup" ? "text-white border-b-2 border-green-500" : "text-white/70"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          {/* Sign In Form */}
          {activeTab === "signin" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded bg-purple-800/50 border border-white/10 focus:border-green-500 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded bg-purple-800/50 border border-white/10 focus:border-green-500 outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-500 rounded font-medium hover:bg-green-600 transition"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded bg-purple-800/50 border border-white/10 focus:border-green-500 outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded bg-purple-800/50 border border-white/10 focus:border-green-500 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded bg-purple-800/50 border border-white/10 focus:border-green-500 outline-none"
                  placeholder="Create a password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-500 rounded font-medium hover:bg-green-600 transition"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
     
    </div>
  );
};

export default AuthPage;
