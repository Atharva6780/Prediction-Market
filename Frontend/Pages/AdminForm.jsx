import React, { useState } from "react";

const AdminCreateMarket = () => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [endDate, setEndDate] = useState("");

  const [outcomes, setOutcomes] = useState([
    { label: "YES", probability: 50 },
    { label: "NO", probability: 50 },
  ]);

  const handleOutcomeChange = (index, field, value) => {
    const updated = [...outcomes];
    updated[index][field] = value;
    setOutcomes(updated);
  };

  const addOutcome = () => {
    setOutcomes([...outcomes, { label: "", probability: 0 }]);
  };

  const removeOutcome = (index) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const marketData = {
      question,
      description,
      image,
      endDate,
      outcomes,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/markets/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(marketData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data);
        alert("Failed to create market");
        return;
      }

      console.log("Market created:", data);
      alert("Market created successfully!");

      // Optional: reset form
      setQuestion("");
      setDescription("");
      setImage("");
      setEndDate("");
      setOutcomes([
        { label: "YES", probability: 50 },
        { label: "NO", probability: 50 },
      ]);

    } catch (error) {
      console.error("Server error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Create New Market</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Resolution Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm h-24"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-2 rounded-md text-sm"
              
            />
          </div>

          {/* Outcomes */}
          <div>
            <label className="block text-sm font-medium mb-2">Outcomes</label>

            {outcomes.map((outcome, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={outcome.label}
                  onChange={(e) =>
                    handleOutcomeChange(index, "label", e.target.value)
                  }
                  className="flex-1 border px-3 py-2 rounded-md text-sm"
                />

                <input
                  type="number"
                  value={outcome.probability}
                  onChange={(e) =>
                    handleOutcomeChange(
                      index,
                      "probability",
                      Number(e.target.value)
                    )
                  }
                  className="w-24 border px-3 py-2 rounded-md text-sm"
                />

                {outcomes.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOutcome(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addOutcome}
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Outcome
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm"
          >
            Create Market
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateMarket;
