import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router";

export const Delete: React.FC = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await axiosInstance.delete("/users");
      alert(response.data.message || "Account deleted successfully.");
      navigate("/login");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to delete account. Please try again later."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="w-full bg-red-600 text-white py-3 rounded-md shadow-md hover:bg-red-700 transition-colors font-semibold"
        aria-label="Delete user account"
      >
        {isDeleting ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
};
