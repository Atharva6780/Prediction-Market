import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.png"; // make sure path is correct
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src={logo}
            alt="Prediction Market Logo"
            className="h-10 w-10 object-cover"
          />
          <span className="text-xl font-semibold text-gray-900">
            PredictionMarket
          </span>
        </Link>

        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search markets, predictions..."
            className="w-full px-4 py-2 border rounded-md text-sm 
                       focus:outline-none focus:ring-2 focus:ring-[#2965a4]"
          />
        </div>

        <div className="flex items-center gap-6 text-sm flex-shrink-0">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-[#2965a4]">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-[#1d4570] text-white px-4 py-2 rounded-md hover:bg-[#2965a4]"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <ProfileDropdown/>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
