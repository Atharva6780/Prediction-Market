import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MarketDetail = () => {
  const { marketId } = useParams();
  const navigate = useNavigate();
  const [market, setMarket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // trading state
  const [selectedOutcome, setSelectedOutcome] = useState("YES");
  const [amount, setAmount] = useState(0);

  /* ---------------- FETCH MARKET ---------------- */
  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/markets/${marketId}`
        );
        const data = await res.json();
        setMarket(data.market);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
  }, [marketId]);

  /* ---------------- PLACE TRADE ---------------- */
  const handleTrade = async () => {
    if (!token) {
      alert("Please login to trade");
      return;
    }

    if (amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/bets/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          marketId,
          outcome: selectedOutcome,
          amount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Trade failed");
        return;
      }

      alert(`Trade placed on ${selectedOutcome} ✅`);
      setAmount(0);

      // update market locally with latest probabilities
      setMarket(data.market);
    } catch (error) {
      console.error(error);
      alert("Trade failed");
    }
  };

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading market...</p>
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Market not found</h3>
          <p className="text-gray-500 mb-6">The market you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Markets
          </button>
        </div>
      </div>
    );
  }

  // 🔥 extract probabilities
  const yesOutcome = market.outcomes.find((o) => o.label === "YES");
  const noOutcome = market.outcomes.find((o) => o.label === "NO");

  const yesPrice = yesOutcome?.probability ?? 50;
  const noPrice = noOutcome?.probability ?? 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group transition-colors"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Markets</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl shadow-lg shadow-blue-500/30">
                  🏷️
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    {market.question}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Prediction Market
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Probability Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 shadow-sm"></div>
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">YES</span>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-1">{yesPrice}%</div>
                <div className="text-xs text-gray-500 font-medium">Chance of YES</div>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-red-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 shadow-sm"></div>
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">NO</span>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold text-red-600 mb-1">{noPrice}%</div>
                <div className="text-xs text-gray-500 font-medium">Chance of NO</div>
              </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-bold text-gray-900">Price History</h3>
                <p className="text-sm text-gray-500 mt-0.5">Market probability over time</p>
              </div>
              <div className="h-[320px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">Price chart coming soon</p>
                  <p className="text-sm text-gray-400 mt-1">Historical data will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Market Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-green-200">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Volume</div>
                    <div className="text-lg font-bold text-gray-900">₹{market.volume.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">End Date</div>
                    <div className="text-lg font-bold text-gray-900">
                      {new Date(market.endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – TRADE PANEL */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
                <h2 className="text-lg font-bold text-white">Place Your Trade</h2>
                <p className="text-sm text-blue-100 mt-0.5">Select an outcome and amount</p>
              </div>

              <div className="p-6 space-y-5">
                {/* YES / NO selection */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                    Choose Outcome
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedOutcome("YES")}
                      className={`relative overflow-hidden py-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                        selectedOutcome === "YES"
                          ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/40 scale-105"
                          : "bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg">YES</span>
                        <span className="text-xs opacity-90">{yesPrice}¢</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedOutcome("NO")}
                      className={`relative overflow-hidden py-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                        selectedOutcome === "NO"
                          ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/40 scale-105"
                          : "bg-red-50 text-red-700 border-2 border-red-200 hover:bg-red-100"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg">NO</span>
                        <span className="text-xs opacity-90">{noPrice}¢</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Amount Display */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    Trade Amount
                  </label>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl p-5 border-2 border-gray-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl text-gray-500">₹</span>
                      <span className="text-5xl font-bold text-gray-900">{amount}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Add Buttons */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                    Quick Add
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 20, 100].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount((prev) => prev + v)}
                        className="bg-gray-100 hover:bg-gray-200 active:scale-95 py-3 rounded-lg text-sm font-semibold text-gray-700 transition-all duration-200 border border-gray-200"
                      >
                        +₹{v}
                      </button>
                    ))}

                    <button
                      onClick={() => setAmount(0)}
                      className="bg-red-50 hover:bg-red-100 active:scale-95 py-3 rounded-lg text-sm font-semibold text-red-600 transition-all duration-200 border border-red-200"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Trade Button */}
                <button
                  onClick={handleTrade}
                  disabled={amount <= 0}
                  className={`w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all duration-200 ${
                    amount <= 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
                  }`}
                >
                  {amount <= 0 ? "Enter Amount to Trade" : `Place Trade on ${selectedOutcome}`}
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By trading, you agree to our{" "}
                  <span className="text-blue-600 hover:underline cursor-pointer">Terms of Use</span>
                  {" "}and understand the risks involved in prediction markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;