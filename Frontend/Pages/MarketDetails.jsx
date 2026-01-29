import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MarketDetail = () => {
  const { marketId } = useParams();
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
  if (loading) return <div className="p-6">Loading...</div>;
  if (!market) return <div className="p-6">Market not found</div>;

  // 🔥 extract probabilities
  const yesOutcome = market.outcomes.find((o) => o.label === "YES");
  const noOutcome = market.outcomes.find((o) => o.label === "NO");

  const yesPrice = yesOutcome?.probability ?? 50;
  const noPrice = noOutcome?.probability ?? 50;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
              🏷️
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {market.question}
              </h1>
              <p className="text-sm text-blue-600 mt-1">
                Prediction market
              </p>
            </div>
          </div>

          {/* Outcomes summary */}
          <div className="flex gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>YES</span>
              <span className="text-gray-500">{yesPrice}%</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>NO</span>
              <span className="text-gray-500">{noPrice}%</span>
            </div>
          </div>

          {/* Chart placeholder */}
          <div className="h-[320px] bg-white border rounded-lg flex items-center justify-center text-gray-400">
            📈 Price chart (coming soon)
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>💰 ₹{market.volume} Vol.</span>
            <span>
              ⏰ Ends {new Date(market.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE – TRADE PANEL */}
        <div className="bg-white border rounded-xl p-5 space-y-4">

          {/* YES / NO selection WITH PROBABILITY */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedOutcome("YES")}
              className={`flex-1 py-3 rounded-md font-semibold transition ${
                selectedOutcome === "YES"
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-700"
              }`}
            >
              YES {yesPrice}¢
            </button>

            <button
              onClick={() => setSelectedOutcome("NO")}
              className={`flex-1 py-3 rounded-md font-semibold transition ${
                selectedOutcome === "NO"
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-700"
              }`}
            >
              NO {noPrice}¢
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm text-gray-500">Amount</label>
            <div className="text-3xl font-bold text-gray-900 mt-1">
              ₹{amount}
            </div>
          </div>

          {/* Quick add buttons */}
          <div className="flex gap-2">
            {[1, 20, 100].map((v) => (
              <button
                key={v}
                onClick={() => setAmount((prev) => prev + v)}
                className="flex-1 bg-gray-100 py-2 rounded-md text-sm hover:bg-gray-200"
              >
                +₹{v}
              </button>
            ))}

            <button
              onClick={() => setAmount(0)}
              className="flex-1 bg-gray-100 py-2 rounded-md text-sm hover:bg-gray-200"
            >
              Clear
            </button>
          </div>

          {/* Trade button */}
          <button
            onClick={handleTrade}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
          >
            Trade
          </button>

          <p className="text-xs text-gray-500 text-center">
            By trading, you agree to the Terms of Use
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
