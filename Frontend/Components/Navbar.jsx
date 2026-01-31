import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.png";
import ProfileDropdown from "./ProfileDropdown";
import DepositModal from "./DepositModal";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [balance, setBalance] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);

  /* ---------------- FETCH BALANCE ---------------- */
  useEffect(() => {
    if (!token) return;

    const fetchBalance = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setBalance(data.user.balance);
      } catch (error) {
        console.error("Failed to fetch balance");
      }
    };

    fetchBalance();
  }, [token]);

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* LEFT - Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group transition-all duration-200 hover:opacity-80"
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="h-9 w-9 transition-transform duration-200 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent hidden sm:block">
                PredictionMarket
              </span>
            </Link>

            {/* CENTER - Search */}
            <div className="flex-1 max-w-xl mx-4 lg:mx-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg 
                    className="h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-500 
                           transition-all duration-200 
                           focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
                           hover:border-gray-300"
                />
              </div>
            </div>

            {/* RIGHT - Actions */}
            <div className="flex items-center gap-3 sm:gap-4">

              {/* Balance */}
              {isLoggedIn && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center text-white justify-center w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-sm">
                    ₹
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider leading-none">
                      Balance
                    </span>
                    <span className="text-sm font-bold text-gray-900 leading-tight">
                      ₹{balance.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Deposit Button */}
              {isLoggedIn && (
                <button
                  onClick={() => setShowDeposit(true)}
                  className="px-4 py-2 text-sm font-semibold text-white 
                             bg-gradient-to-r from-green-500 to-emerald-600 
                             rounded-lg shadow-md shadow-green-500/30
                             hover:from-green-600 hover:to-emerald-700
                             transition-all duration-200 active:scale-95"
                >
                  Deposit
                </button>
              )}

              {/* Auth Buttons */}
              {!isLoggedIn ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 hidden sm:block"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="group relative px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg 
                             shadow-lg shadow-blue-500/30 
                             hover:shadow-xl hover:shadow-blue-500/40 
                             hover:from-blue-700 hover:to-blue-800
                             transition-all duration-200 
                             active:scale-95"
                  >
                    <span className="relative z-10">Sign up</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                  </Link>
                </div>
              ) : (
                <ProfileDropdown />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={showDeposit}
        onClose={() => setShowDeposit(false)}
      />
    </>
  );
};

export default Navbar;
