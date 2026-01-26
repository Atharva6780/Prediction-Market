import React from "react";
import { useNavigate } from "react-router-dom";

const MarketCard = ({ market }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/markets/${market._id}`)}
      className="rounded-xl p-5 bg-blue-50 cursor-pointer
                 hover:shadow-md transition"
    >
      {/* Question */}
      <h2 className="text-lg font-semibold mb-3">
        {market.question}
      </h2>

      {/* Meta */}
      <div className="text-sm text-gray-500 mb-4">
        Ends on {new Date(market.endDate).toLocaleDateString()}
      </div>

      {/* Buttons (preview only) */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex-1 border border-green-500 text-green-600 
                     rounded-md py-2 hover:bg-green-50 font-medium"
        >
          YES
        </button>

        <button
          onClick={(e) => e.stopPropagation()}
          className="flex-1 border border-red-500 text-red-600 
                     rounded-md py-2 hover:bg-red-50 font-medium"
        >
          NO
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
 