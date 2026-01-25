import React from "react";

const MarketCard = ({ market }) => {
  return (
    <div className="rounded-xl p-5 hover:shadow-md transition bg-blue-50">
      
      {/* Question */}
      <h2 className="text-lg font-semibold mb-3">
        {market.question}
      </h2>

      {/* Meta */}
      <div className="text-sm text-gray-500 mb-4">
        Ends on {market.endDate}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-4">
        <button className="flex-1 border border-green-500 text-green-600 
                           rounded-md py-2 hover:bg-green-50 font-medium">
          YES ₹{market.yesPrice}
        </button>

        <button className="flex-1 border border-red-500 text-red-600 
                           rounded-md py-2 hover:bg-red-50 font-medium">
          NO ₹{market.noPrice}
        </button>
      </div>

      {/* Volume */}
      <div className="text-sm text-gray-600">
        Volume: ₹{market.volume}
      </div>
    </div>
  );
};

export default MarketCard;
