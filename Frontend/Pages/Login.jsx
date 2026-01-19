import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data)

      localStorage.setItem("token",data.token)
      navigate('/')

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT – Design / Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-50">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Decorative dots */}
          <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Decorative shapes */}
          <div className="relative z-10 flex gap-6">
            <div className="w-16 h-16 bg-purple-400 rotate-45 rounded-sm" />
            <div className="w-12 h-12 bg-indigo-500 rotate-45 rounded-sm" />
            <div className="w-10 h-10 bg-blue-500 rotate-45 rounded-sm" />
          </div>
        </div>
      </div>

      {/* RIGHT – Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="text-3xl font-semibold mb-2">Log in</h1>
          <p className="text-sm text-gray-600 mb-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/resetPassword" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            Continue →
          </button>

          {/* Divider */}
          <div className="my-6 border-t" />

          {/* Alternative Login */}
          <button className="w-full border border-gray-300 py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
