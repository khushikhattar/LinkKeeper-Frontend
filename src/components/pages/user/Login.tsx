import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import axiosInstance from "../../../api/axiosInstance";
import { ModeToggle } from "../../Toggle";

const loginSchema = z.object({
  identifier: z.string().min(1, "Username or Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type loginType = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: loginType) => {
    setApiError("");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/users/login", data);
      const user = res.data.user;
      const token = res.data.accessToken;

      if (!user || !token) throw new Error("Login response invalid");

      login(user, token);
      localStorage.setItem("accessToken", token);

      navigate("/dashboard");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 px-4 relative">
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username or Email</label>
            <input
              type="text"
              {...register("identifier")}
              placeholder="Enter your username or email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {apiError && <p className="text-red-500 text-center">{apiError}</p>}
          {loading && (
            <p className="text-blue-500 text-center">Logging in...</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2 rounded-md font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
