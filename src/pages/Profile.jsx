import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import {
  UserIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const { user, updateProfile, generateApiKey } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  // API key form state
  const [apiKeyData, setApiKeyData] = useState({
    name: "",
    permissions: ["read", "write"],
  });

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await axios.get("/auth/api-keys");
      setApiKeys(response.data.data);
    } catch (error) {
      console.error("Error fetching API keys:", error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateApiKey = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await generateApiKey(
        apiKeyData.name,
        apiKeyData.permissions
      );
      if (result.success) {
        alert(
          `API Key generated successfully!\nKey: ${result.data.key}\n\nPlease save this key securely as it won't be shown again.`
        );
        setApiKeyData({ name: "", permissions: ["read", "write"] });
        setShowApiKeyForm(false);
        fetchApiKeys();
      }
    } catch (error) {
      alert("Failed to generate API key");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApiKey = async (keyId) => {
    if (!confirm("Are you sure you want to delete this API key?")) return;

    try {
      await axios.delete(`/auth/api-keys/${keyId}`);
      fetchApiKeys();
      alert("API key deleted successfully!");
    } catch (error) {
      alert("Failed to delete API key");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Manage your account and API access</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <div className="card">
          <div className="flex items-center mb-6">
            <UserIcon className="h-6 w-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="input-field bg-gray-50"
                  disabled
                />
                <p className="text-sm text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>

        {/* Account Information */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Credits Remaining:</span>
              <span className="font-semibold">{user?.credits || 0}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Subscription Tier:</span>
              <span className="font-semibold capitalize">
                {user?.subscriptionTier || "free"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span className="font-semibold">
                {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-semibold">
                {new Date(user?.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="card mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <KeyIcon className="h-6 w-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
          </div>
          <button
            onClick={() => setShowApiKeyForm(true)}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Generate New Key
          </button>
        </div>

        {apiKeys.length === 0 ? (
          <div className="text-center py-8">
            <KeyIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No API keys generated yet</p>
            <button
              onClick={() => setShowApiKeyForm(true)}
              className="btn-primary"
            >
              Generate Your First API Key
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey._id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{apiKey.name}</h3>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Permissions: {apiKey.permissions.join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteApiKey(apiKey._id)}
                    className="text-danger-600 hover:text-danger-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Key Generation Modal */}
      {showApiKeyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generate API Key</h2>
              <button
                onClick={() => setShowApiKeyForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateApiKey}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Name
                </label>
                <input
                  type="text"
                  value={apiKeyData.name}
                  onChange={(e) =>
                    setApiKeyData({ ...apiKeyData, name: e.target.value })
                  }
                  className="input-field"
                  placeholder="e.g., Production API Key"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {["read", "write", "delete"].map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={apiKeyData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiKeyData({
                              ...apiKeyData,
                              permissions: [
                                ...apiKeyData.permissions,
                                permission,
                              ],
                            });
                          } else {
                            setApiKeyData({
                              ...apiKeyData,
                              permissions: apiKeyData.permissions.filter(
                                (p) => p !== permission
                              ),
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {permission}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowApiKeyForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Generating..." : "Generate Key"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
