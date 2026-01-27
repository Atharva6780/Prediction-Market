import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/bets/my", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setBets(data.bets || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, [token]);

  const handleSell = async (bet) => {
    const marketEnded =
      new Date(bet.marketId?.endDate) < new Date();

    if (marketEnded) {
      alert("Market has ended. You cannot sell this position.");
      return;
    }

    const confirmSell = window.confirm(
      "Are you sure you want to sell this position?"
    );
    if (!confirmSell) return;

    // SELL = opposite outcome
    const sellOutcome = bet.outcome === "YES" ? "NO" : "YES";

    try {
      const res = await fetch("http://localhost:3000/api/bets/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          marketId: bet.marketId._id,
          outcome: sellOutcome,
          amount: bet.amount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Sell failed");
        return;
      }

      alert("Position sold successfully");

      // refresh portfolio
      setBets((prev) =>
        prev.map((b) =>
          b._id === bet._id
            ? { ...b, status: "CLOSED" }
            : b
        )
      );

    } catch (error) {
      console.error(error);
      alert("Sell failed");
    }
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Loading portfolio...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Portfolio
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your active and past positions
          </p>
        </div>

        {/* Empty State */}
        {bets.length === 0 && (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            You haven’t placed any trades yet.
          </div>
        )}

        {/* Table */}
        {bets.length > 0 && (
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3 font-medium">Market</th>
                  <th className="px-4 py-3 font-medium">Outcome</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Placed At</th>
                  <th className="px-4 py-3 font-medium text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {bets.map((bet) => {
                  const marketEnded =
                    new Date(bet.marketId?.endDate) < new Date();

                  return (
                    <tr
                      key={bet._id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-gray-900">
                        {bet.marketId?.question || "—"}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            bet.outcome === "YES"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {bet.outcome}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-900">
                        ₹{bet.amount}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            bet.status === "WON"
                              ? "bg-green-100 text-green-700"
                              : bet.status === "LOST"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {bet.status || "OPEN"}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-500">
                        {new Date(bet.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleSell(bet)}
                          disabled={marketEnded || bet.status !== "OPEN"}
                          className={`px-3 py-1 text-xs rounded-md font-medium ${
                            marketEnded || bet.status !== "OPEN"
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          Sell
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
