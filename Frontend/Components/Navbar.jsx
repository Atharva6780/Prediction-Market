import React from "react";
import { Link } from "react-router-dom";
import logo from "../src/assets/logo.png"; // make sure path is correct

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left – Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Prediction Market Logo"
            className="h-10 w-10 object-cover"
          />
          <span className="text-xl font-semibold text-gray-900">
            Prediction Market
          </span>
        </Link>

        {/* Right – Actions */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
