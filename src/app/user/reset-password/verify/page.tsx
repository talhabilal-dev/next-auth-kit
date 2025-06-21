"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    isLoading: false,
    isSuccess: false,
    error: null as string | null,
  });

  const handleChange =
    (field: "password" | "confirmPassword") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, [field]: e.target.value, error: null }));
    };

  const validate = () => {
    if (!state.password || !state.confirmPassword) {
      return "Please fill in both password fields.";
    }
    if (state.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (state.password !== state.confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      return setState((prev) => ({ ...prev, error }));
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch("/api/users/forgot-password/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password: state.password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to reset password.");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        password: "",
        confirmPassword: "",
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || "Something went wrong.",
      }));
    }
  };

  const handleBackToLogin = () => {
    router.push("/user/login");
  };

  const gradientBg =
    "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900";

  if (!token) {
    return (
      <div
        className={`min-h-screen ${gradientBg} flex items-center justify-center p-4`}
      >
        <div className="bg-white/5 border border-white/10 backdrop-blur-md text-white p-8 rounded-xl max-w-md w-full shadow-xl text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Invalid or Missing Token
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            The password reset link may be invalid or expired.
          </p>
          <button
            onClick={handleBackToLogin}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:from-pink-600 hover:to-purple-700 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (state.isSuccess) {
    return (
      <div
        className={`min-h-screen ${gradientBg} flex items-center justify-center p-4`}
      >
        <div className="bg-white/5 border border-white/10 backdrop-blur-md text-white p-8 rounded-xl max-w-md w-full shadow-xl text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Password Updated!</h2>
          <p className="text-sm text-gray-300 mb-6">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>
          <button
            onClick={handleBackToLogin}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white font-medium hover:from-pink-600 hover:to-purple-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${gradientBg} flex items-center justify-center p-4 relative`}
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl text-white">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Reset Your Password</h1>
          <p className="text-sm text-gray-300">
            Enter and confirm your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={state.password}
              onChange={handleChange("password")}
              className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border ${
                state.error ? "border-red-500" : "border-white/20"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
              placeholder="New password"
              disabled={state.isLoading}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={state.confirmPassword}
              onChange={handleChange("confirmPassword")}
              className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border ${
                state.error ? "border-red-500" : "border-white/20"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
              placeholder="Confirm password"
              disabled={state.isLoading}
            />
          </div>

          {state.error && (
            <div className="flex items-center text-sm text-red-400">
              <AlertCircle className="w-4 h-4 mr-1" />
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {state.isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Resetting...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Reset Password
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleBackToLogin}
            className="inline-flex items-center text-sm text-purple-300 hover:text-purple-400 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
