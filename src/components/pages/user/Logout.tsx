import React, { useState } from "react";
import { useAuth } from "../../../auth/useAuth";

export const Logout: React.FC = () => {
  const { logout } = useAuth();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleLogoutClick = () => setIsConfirming(true);
  const confirmLogout = async () => {
    setIsConfirming(false);
    await logout();
  };
  const cancelLogout = () => setIsConfirming(false);

  return (
    <>
      <div className="max-w-md mx-auto mt-6">
        <button
          onClick={handleLogoutClick}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors font-semibold"
        >
          Logout
        </button>
      </div>

      {isConfirming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card dark:bg-gray-700 rounded-xl p-6 max-w-sm mx-4 text-center shadow-lg">
            <p className="mb-4 text-lg font-semibold text-card-foreground">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-colors font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
