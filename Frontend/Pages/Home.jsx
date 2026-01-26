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
      <div className="min-h-screen flex items-center justify-center">
        Loading markets...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {markets.length === 0 ? (
          <p className="text-gray-500">No markets available.</p>
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
