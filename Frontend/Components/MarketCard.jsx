import React from "react";
import { useNavigate } from "react-router-dom";

const MarketCard = ({ market }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/markets/${market._id}`)}
      className="group relative rounded-xl p-6 bg-white border border-gray-200 cursor-pointer
                 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1
                 transition-all duration-300 ease-out overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Question */}
        <h2 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-snug group-hover:text-blue-900 transition-colors duration-200">
          {market.question}
        </h2>

        {/* Meta info with icon */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
          <svg 
            className="w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="font-medium">
            Ends {new Date(market.endDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>

        {/* Buttons (preview only) */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={(e) => e.stopPropagation()}
            className="group/btn flex-1 relative overflow-hidden
                       border-2 border-green-500 text-green-600 
                       rounded-lg py-3 font-bold text-sm
                       hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/30
                       active:scale-95
                       transition-all duration-200"
          >
            <span className="relative z-10">YES</span>
            <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 origin-left"></div>
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="group/btn flex-1 relative overflow-hidden
                       border-2 border-red-500 text-red-600 
                       rounded-lg py-3 font-bold text-sm
                       hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30
                       active:scale-95
                       transition-all duration-200"
          >
            <span className="relative z-10">NO</span>
            <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 origin-left"></div>
          </button>
        </div>

        {/* Volume with enhanced styling */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
              <svg 
                className="w-4 h-4 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Volume</div>
              <div className="text-sm font-bold text-gray-900">₹{market.volume.toLocaleString()}</div>
            </div>
          </div>
          
          {/* Arrow indicator */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
            <svg 
              className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default MarketCard;