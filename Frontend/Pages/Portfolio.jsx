import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 sell modal state
  const [selectedBet, setSelectedBet] = useState(null);
  const [sellAmount, setSellAmount] = useState("");

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

  /* ---------------- SELL CONFIRM ---------------- */
  const confirmSell = async () => {
    if (!sellAmount || sellAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (sellAmount > selectedBet.amount) {
      alert("Sell amount cannot exceed bet amount");
      return;
    }

    const sellOutcome =
      selectedBet.outcome === "YES" ? "NO" : "YES";

    try {
      const res = await fetch("http://localhost:3000/api/bets/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          marketId: selectedBet.marketId._id,
          outcome: sellOutcome,
          amount: sellAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Sell failed");
        return;
      }

      alert("Position sold successfully");

      setBets((prev) =>
        prev.map((b) =>
          b._id === selectedBet._id
            ? { ...b, status: "CLOSED" }
            : b
        )
      );

      // close modal
      setSelectedBet(null);
      setSellAmount("");

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

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Portfolio
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your active and past positions
          </p>
        </div>

        {bets.length === 0 && (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            You haven’t placed any trades yet.
          </div>
        )}

        {bets.length > 0 && (
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3">Market</th>
                  <th className="px-4 py-3">Outcome</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Placed At</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {bets.map((bet) => {
                  const marketEnded =
                    new Date(bet.marketId?.endDate) < new Date();

                  return (
                    <tr key={bet._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {bet.marketId?.question}
                      </td>

                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          bet.outcome === "YES"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {bet.outcome}
                        </span>
                      </td>

                      <td className="px-4 py-3">₹{bet.amount}</td>

                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs rounded bg-gray-100">
                          {bet.status || "OPEN"}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-500">
                        {new Date(bet.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedBet(bet)}
                          disabled={marketEnded || bet.status !== "OPEN"}
                          className={`px-3 py-1 text-xs rounded ${
                            marketEnded || bet.status !== "OPEN"
                              ? "bg-gray-100 text-gray-400"
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

      {/* ================= SELL MODAL ================= */}
      {selectedBet && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">
              Sell Position
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {selectedBet.marketId.question}
            </p>

            <div className="mb-4">
              <label className="text-sm font-medium">
                Sell Amount
              </label>
              <input
                type="number"
                value={sellAmount}
                onChange={(e) => setSellAmount(Number(e.target.value))}
                className="w-full mt-1 border px-3 py-2 rounded"
                placeholder={`Max ₹${selectedBet.amount}`}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedBet(null);
                  setSellAmount("");
                }}
                className="px-4 py-2 text-sm border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmSell}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded"
              >
                Confirm Sell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
