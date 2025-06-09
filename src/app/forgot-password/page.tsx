"use client";
import React, { useState } from "react";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface ForgotPasswordState {
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const Page: React.FC = () => {
  const [state, setState] = useState<ForgotPasswordState>({
    email: "",
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      email: e.target.value,
      error: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
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

    // Start loading
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      isSuccess: false,
    }));

    try {
      const response = await fetch("/api/users/forgot-password/sent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to send reset link. Please try again."
        );
      }

      console.log("[Success]", data.message);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        error: null,
        // email: '', // Optional: uncomment to reset input
      }));
    } catch (error: any) {
      console.error("[Forgot Password Error]", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.message || "Something went wrong. Please try again.",
      }));
    }
  };

  const handleBackToLogin = () => {
    // Navigate back to login page
    console.log("Navigate to login page");
  };

  const handleResendEmail = () => {
    setState((prev) => ({
      ...prev,
      isSuccess: false,
      error: null,
    }));
  };

  if (state.isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-gray-600">
                We've sent a password reset link to
              </p>
              <p className="font-medium text-gray-900 mt-1">{state.email}</p>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                What's next?
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check your email inbox</li>
                <li>• Click the reset link in the email</li>
                <li>• Create a new password</li>
                <li>• Check your spam folder if you don't see it</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleBackToLogin}
                className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </button>

              <button
                onClick={handleResendEmail}
                className="w-full px-4 py-3 text-purple-600 font-medium border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Resend Email
              </button>
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center mt-6">
              Didn't receive the email? Check your spam folder or contact
              support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-600">
              No worries! Enter your email address and we'll send you a link to
              reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={state.email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  state.error
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                }`}
                disabled={state.isLoading}
              />
              {state.error && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {state.error}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={state.isLoading || !state.email}
              className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
              onClick={handleBackToLogin}
              className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Remember your password?{" "}
              <button
                onClick={handleBackToLogin}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
