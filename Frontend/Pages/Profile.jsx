import React, { useState } from "react";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    "Profile",
    "Account",
    "Trading",
    "Notifications",
    "Builder Codes",
    "Export Private Key",
  ];

  return (
    <div className="min-h-screen bg-white flex justify-center">
      {/* Centered Container */}
      <div className="w-full max-w-6xl flex">
        
        {/* Sidebar */}
        <aside className="w-64 px-6 py-8">
          <h2 className="text-lg font-semibold mb-6">Settings</h2>

          <div className="space-y-2 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-md transition
                  ${
                    activeTab === tab
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-100"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-12 py-8">
          <h1 className="text-2xl font-semibold mb-8">
            {activeTab} Settings
          </h1>

          {/* PROFILE TAB */}
          {activeTab === "Profile" && (
            <>
              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400" />
                <button className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
                  📷 Upload
                </button>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value="atharvashinde908@gmail.com"
                  disabled
                  className="w-full max-w-xl border px-4 py-2 rounded-md bg-gray-50 text-sm"
                />
              </div>

              {/* Username */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value="0x045aa9eaC38B1007337E15a4968E5dEb8e5D2d0A-1769192264162"
                  disabled
                  className="w-full max-w-xl border px-4 py-2 rounded-md bg-gray-50 text-sm"
                />
              </div>

              {/* Bio */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  placeholder="Bio"
                  className="w-full max-w-xl border px-4 py-2 rounded-md h-28 text-sm"
                />
              </div>

              {/* Social */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Social Connections
                </label>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
                  ❌ Connect X
                </button>
              </div>

              {/* Save */}
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm">
                Save changes
              </button>
            </>
          )}

          {/* OTHER TABS */}
          {activeTab !== "Profile" && (
            <div className="text-gray-500 text-sm">
              {activeTab} settings coming soon…
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
