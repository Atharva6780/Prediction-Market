import React, { useState } from "react";

const DepositPage = () => {
  const [amount, setAmount] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleDeposit() {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 1️⃣ Call backend
      const res = await fetch("http://localhost:3000/api/deposits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          referenceId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Deposit failed");
      }

      // 2️⃣ Fake verification delay (3–5 sec)
      await new Promise((resolve) => setTimeout(resolve, 3500));

      // 3️⃣ Success state
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- SUCCESS SCREEN ---------------- */
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 text-center">
          <div className="text-green-500 text-4xl mb-3">✔</div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Deposit Successful
          </h2>
          <p className="text-sm text-gray-500">
            Tokens have been added to your balance
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN FORM ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Deposit Tokens
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter the amount of tokens you want to add
        </p>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            disabled={loading}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-100"
          />
        </div>

        {/* Reference */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reference ID (optional)
          </label>
          <input
            type="text"
            placeholder="UPI / Transaction reference"
            value={referenceId}
            disabled={loading}
            onChange={(e) => setReferenceId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-100"
          />
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          ⚠ Demo system. No real money involved.
        </div>

        <button
          onClick={handleDeposit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg 
                     font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Processing transaction..." : "Confirm Deposit"}
        </button>
      </div>
    </div>
  );
};

export default DepositPage;
