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
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 group">
        <div className="relative">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-200">
            U
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        {/* Arrow */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-full pt-2 z-50 animate-fadeIn">
          <div className="w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* User Info Section */}
            <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-blue-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-md">
                  U
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">User Name</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link 
                to="/profile" 
                className="group/item flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 group-hover/item:bg-blue-100 transition-colors duration-150">
                  <svg 
                    className="w-4 h-4 text-gray-600 group-hover/item:text-blue-600 transition-colors duration-150" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900">Profile</span>
              </Link>

              <Link 
                to="/portfolio" 
                className="group/item flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 group-hover/item:bg-blue-100 transition-colors duration-150">
                  <svg 
                    className="w-4 h-4 text-gray-600 group-hover/item:text-blue-600 transition-colors duration-150" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900">Portfolio</span>
              </Link>

              <Link 
                to="/support" 
                className="group/item flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 group-hover/item:bg-blue-100 transition-colors duration-150">
                  <svg 
                    className="w-4 h-4 text-gray-600 group-hover/item:text-blue-600 transition-colors duration-150" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900">Support</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Logout Button */}
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="group/item w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 group-hover/item:bg-red-100 transition-colors duration-150">
                  <svg 
                    className="w-4 h-4 text-gray-600 group-hover/item:text-red-600 transition-colors duration-150" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-red-600 group-hover/item:text-red-700">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfileDropdown;