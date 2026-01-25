import React from "react";
import MarketCard from "../Components/MarketCard";

const markets = [
  {
    id: 1,
    question: "Will Bitcoin cross $100,000 by Dec 31, 2026?",
    endDate: "Dec 31, 2026",
    yesPrice: 120,
    noPrice: 80,
    volume: 200,
  },
  {
    id: 2,
    question: "Will India win the 2027 Cricket World Cup?",
    endDate: "Nov 19, 2027",
    yesPrice: 90,
    noPrice: 110,
    volume: 350,
  },
  {
    id: 3,
    question: "Will OpenAI release GPT-5 before July 2026?",
    endDate: "July 1, 2026",
    yesPrice: 140,
    noPrice: 60,
    volume: 500,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6">
          Prediction Markets
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
