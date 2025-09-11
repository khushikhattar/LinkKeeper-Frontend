import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axiosInstance from "../../../api/axiosInstance";

// Zod schema matching backend updateProfile validation
const updateSchema = z.object({
  name: z.string().optional(),
  username: z
    .string()
    .min(8, "Username must be at least 8 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
});
type UpdateProfileInput = z.infer<typeof updateSchema>;

export const UpdateProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      alert("Please fill at least one field to update.");
      return;
    }

    try {
      const response = await axiosInstance.patch("/users/update", filteredData);
      alert(response.data.message || "Profile updated successfully");
      reset();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card dark:bg-gray-700 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-card-foreground text-center">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/** Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block mb-1 font-medium text-card-foreground"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/** Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block mb-1 font-medium text-card-foreground"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/** Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-card-foreground"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors font-semibold"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};
