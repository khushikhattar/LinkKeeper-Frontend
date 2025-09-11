import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { ModeToggle } from "../../Toggle";
import { useTheme } from "../../Theme";

const signupSchema = z
  .object({
    name: z.string(),
    username: z.string().min(8, "Username must be of minimum 8 length"),
    email: z.email(),
    password: z.string().min(8, "Password must be of minimum 8 length"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type Signup = z.infer<typeof signupSchema>;

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: Signup) => {
    setApiError("");
    setLoading(true);
    try {
      await axiosInstance.post("/users/register", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      navigate("/login");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <Card className="w-full max-w-md p-8 shadow-lg dark:bg-gray-800 bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create your account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              {...register("confirm")}
              placeholder="Confirm password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            />
            {errors.confirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm.message}
              </p>
            )}
          </div>

          {apiError && <p className="text-red-500 text-center">{apiError}</p>}
          {loading && (
            <p className="text-blue-500 text-center">Registering...</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2 rounded-md"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </Card>
    </div>
  );
};
