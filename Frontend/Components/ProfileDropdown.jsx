import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <div className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <div className="h-8 w-8 rounded-full bg-[#2965a4] flex items-center justify-center text-white font-semibold">
          U
        </div>

        {/* Arrow */}
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Hover bridge */}
      {open && (
        <div className="absolute right-0 top-full pt-2 z-50">
          <div className="w-48 bg-white rounded-md shadow-lg">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </Link>

            <Link to="/portfolio" className="block px-4 py-2 hover:bg-gray-100">
              Portfolio
            </Link>

            <Link to="/support" className="block px-4 py-2 hover:bg-gray-100">
              Support
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
