import React, { useEffect, useState } from "react";
import MarketCard from "../Components/MarketCard";

const Home = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/markets/get"
        );

        const data = await response.json();
        setMarkets(data.markets);
      } catch (error) {
        console.error("Error fetching markets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          {/* Animated spinner */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading markets...</p>
          <p className="text-sm text-gray-400 mt-1">Fetching the latest predictions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-6">
        
        {/* Hero Section */}
        {/* <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Prediction Markets</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trade on the outcomes of real-world events. Make predictions, earn rewards, and discover market sentiment.
          </p>
        </div> */}

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{markets.length}</div>
                <div className="text-xs text-gray-500 font-medium">Active Markets</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₹{markets.reduce((sum, m) => sum + m.volume, 0).toLocaleString()}</div>
                <div className="text-xs text-gray-500 font-medium">Total Volume</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2.4K+</div>
                <div className="text-xs text-gray-500 font-medium">Traders</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-xs text-gray-500 font-medium">Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Markets Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Markets</h2>
            <p className="text-sm text-gray-500 mt-1">Browse and trade on active prediction markets</p>
          </div>
          
          {/* Filter buttons - placeholder for future functionality */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
              All
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              Politics
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              Sports
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              Crypto
            </button>
          </div>
        </div>

        {markets.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No markets available</h3>
            <p className="text-gray-500 max-w-md mx-auto">Check back soon for new prediction markets to trade on.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market) => (
              <MarketCard key={market._id} market={market} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;