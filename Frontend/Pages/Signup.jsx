import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  async function handleSignup() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userName,
          email,
          password,
          confirmPass,
        }),
      });
      const data = await response.json();
      console.log(data);
      navigate('/login')
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT – Decorative Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-50">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Dotted background */}
          <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Abstract shapes */}
          <div className="relative z-10 flex gap-6">
            <div className="w-16 h-16 bg-indigo-500 rotate-45 rounded-sm" />
            <div className="w-12 h-12 bg-blue-500 rotate-45 rounded-sm" />
            <div className="w-10 h-10 bg-purple-500 rotate-45 rounded-sm" />
          </div>
        </div>
      </div>

      {/* RIGHT – Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center my-6 px-6">
        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="text-3xl font-semibold mb-2">Create account</h1>
          <p className="text-sm text-gray-600 mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" required>
              Full name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" required>
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" required>
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" required>
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" required>
              Confirm password
            </label>
            <input
              type="password"
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Age & Terms */}
          <div className="mb-6 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" required />I am 18 years or older
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" required />I agree to the Terms &
              Conditions
            </label>
          </div>

          {/* Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700"
          >
            Create account →
          </button>

          {/* Divider */}
          <div className="my-6 border-t" />

          {/* Alternative Signup */}
          <button className="w-full border border-gray-300 py-2 hover:bg-gray-50">
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
