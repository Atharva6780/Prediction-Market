import React, { useState, useEffect } from "react";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const [profile, setProfile] = useState({
    email: "",
    username: "",
    bio: "",
    avatar: "",
  });

  const [originalProfile, setOriginalProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const tabs = [
    {
      name: "Profile",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      name: "Account",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    },
    { name: "Trading", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    {
      name: "Notifications",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    },
    { name: "Builder Codes", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
    {
      name: "Export Private Key",
      icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setProfile({
          email: data.email,
          username: data.username,
          bio: data.bio || "",
          avatar: data.avatar || "",
        });
        setOriginalProfile(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }
      setLoading(true);

      await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio: profile.bio,
        }),
      });

      setOriginalProfile(profile);
    } catch (err) {
      console.error("Failed to save profile", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    if (originalProfile) {
      setProfile({
        email: originalProfile.email,
        username: originalProfile.username,
        bio: originalProfile.bio || "",
        avatar: originalProfile.avatar || "",
      });
    }
  };

  /* ================= AVATAR UPLOAD ================= */
  const handleAvatarUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      setProfile((prev) => ({ ...prev, avatar: data.avatar }));
    } catch (err) {
      console.error("Avatar upload failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="w-full max-w-7xl mx-auto flex">
        <aside className="w-72 px-6 py-8 bg-white/80 backdrop-blur-sm border-r border-gray-200 sticky top-0 h-screen">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Settings</h2>
            <p className="text-sm text-gray-500">
              Manage your account preferences
            </p>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                  ${
                    activeTab === tab.name
                      ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <svg
                  className={`w-5 h-5 transition-colors ${
                    activeTab === tab.name
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={tab.icon}
                  />
                </svg>
                <span className="text-sm">{tab.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-8 lg:px-12 py-8">
          {activeTab === "Profile" && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="avatar-upload"
                  onChange={(e) => handleAvatarUpload(e.target.files[0])}
                />
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer inline-flex items-center gap-2 border-2 border-gray-300 px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-700"
                >
                  Upload Photo
                </label>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm"
                  rows="4"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
