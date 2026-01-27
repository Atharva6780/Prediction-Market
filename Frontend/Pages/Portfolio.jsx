import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/bets/my", {
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
                </tr>
              </thead>

              <tbody>
                {bets.map((bet) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
