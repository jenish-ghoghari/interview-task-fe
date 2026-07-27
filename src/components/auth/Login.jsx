    import React, { useState } from "react";
    import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import { loginUser } from "../../services/service";
    import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

    // Define validation schema using Yup
    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    export default function Login() {
        const [loading, setLoading] = useState(false);
        const [serverError, setServerError] = useState("");
        const navigate = useNavigate();
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(schema),
        });

       const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
        const response = await loginUser(data);

        // Check response
        if (!response || !response.token) {
            throw new Error("Invalid login response");
        }

        // Save authentication data
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);

        toast.success("Login Successful!");

        // Redirect based on role
        if (response.role === "Admin") {
            navigate("/admin-dashboard", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.response?.data ||
            error?.message ||
            "Login failed. Please try again.";

        setServerError(message);
        toast.error(message);
    } finally {
        setLoading(false);
    }
};

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-md rounded-lg">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    {serverError && (
                        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                            {serverError}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${errors.email
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                        }`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${errors.password
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                        }`}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account? <Link to={`/register`} className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }