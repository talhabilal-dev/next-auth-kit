"use client";
import React, { useState } from "react";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ForgotPasswordState {
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useState<ForgotPasswordState>({
    email: "",
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, email: e.target.value, error: null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.email) {
      return setState((prev) => ({
        ...prev,
        error: "Please enter your email address",
      }));
    }
    if (!validateEmail(state.email)) {
      return setState((prev) => ({
        ...prev,
        error: "Please enter a valid email address",
      }));
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      isSuccess: false,
    }));

    try {
      const response = await fetch("/api/users/forgot-password/sent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to send reset link.");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.message || "Something went wrong.",
      }));
    }
  };

  const handleBackToLogin = () => {
    router.push("/user/login");
  };

  const handleResendEmail = () => {
    setState((prev) => ({ ...prev, isSuccess: false, error: null }));
  };

  const gradientBg = "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900";

  if (state.isSuccess) {
    return (
      <div className={`min-h-screen ${gradientBg} flex items-center justify-center p-4 relative`}>
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
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Check Your Email</h1>
            <p className="text-sm text-gray-300">
              We've sent a password reset link to
            </p>
            <p className="mt-1 font-medium text-white">{state.email}</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6 text-sm text-purple-200">
            <p className="font-medium mb-2">What’s next?</p>
            <ul className="space-y-1">
              <li>• Check your email inbox</li>
              <li>• Click the reset link</li>
              <li>• Create a new password</li>
              <li>• Check spam if you don’t see it</li>
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleBackToLogin}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white font-medium hover:from-pink-600 hover:to-purple-700 transition"
            >
              <ArrowLeft className="inline-block w-4 h-4 mr-2" />
              Back to Login
            </button>
            <button
              onClick={handleResendEmail}
              className="w-full py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition"
            >
              Resend Email
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Didn’t get the email? Check your spam or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${gradientBg} flex items-center justify-center p-4 relative`}>
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
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Forgot Password?</h1>
          <p className="text-sm text-gray-300">
            No worries — enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={state.email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              disabled={state.isLoading}
              className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border transition ${
                state.error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-white/20 focus:ring-purple-500"
              } focus:outline-none focus:ring-2`}
            />
            {state.error && (
              <div className="flex items-center mt-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 mr-1" />
                {state.error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={state.isLoading || !state.email}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {state.isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send Reset Link
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

        <p className="text-xs text-gray-400 text-center mt-6">
          Remember your password?{" "}
          <button
            onClick={handleBackToLogin}
            className="text-purple-300 hover:text-purple-400 font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Page;
