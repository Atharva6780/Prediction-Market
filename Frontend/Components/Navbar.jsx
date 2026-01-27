import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.png";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [balance, setBalance] = useState(0);

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
    <nav className="w-full border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* LEFT */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-semibold text-gray-900">
            PredictionMarket
          </span>
        </Link>

        {/* CENTER */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search markets..."
            className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-[#2965a4]"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm">

          {/* Balance */}
          {isLoggedIn && (
            <div className="text-gray-700 font-medium">
              Balance: <span className="text-gray-900">₹{balance}</span>
            </div>
          )}

          {/* Auth */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-[#2965a4]">
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
            <ProfileDropdown />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
