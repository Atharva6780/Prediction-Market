import React from "react";

const DepositModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Content */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Deposit Tokens
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Scan the QR code to proceed with deposit
        </p>

        {/* QR */}
        <div className="flex justify-center mb-6">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:5173/deposit"
            alt="Deposit QR"
            className="border rounded-lg p-2"
          />
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DepositModal;
