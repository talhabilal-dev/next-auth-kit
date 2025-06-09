"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface VerificationState {
  status: "loading" | "success" | "error" | "expired";
  message: string;
}

export default function VerifyTokenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verification, setVerification] = useState<VerificationState>({
    status: "loading",
    message: "Verifying your token...",
  });

  // Get token and type from URL parameters
  const token = searchParams.get("token");
  const type = searchParams.get("type") || "email"; // 'email' or 'reset-password'

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerification({
          status: "error",
          message: "Invalid verification link. Token is missing.",
        });
        return;
      }

      try {
        // Simulate API call to verify token
        const response = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, type }),
        });

        const data = await response.json();

        if (response.ok) {
          setVerification({
            status: "success",
            message:
              type === "email"
                ? "Email verified successfully! You can now log in."
                : "Token verified! You can now reset your password.",
          });

          // Redirect after successful verification
          setTimeout(() => {
            if (type === "reset-password") {
              router.push(`/reset-password?token=${token}`);
            } else {
              router.push("/login?verified=true");
            }
          }, 2000);
        } else {
          setVerification({
            status: data.expired ? "expired" : "error",
            message: data.message || "Verification failed. Please try again.",
          });
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerification({
          status: "error",
          message: "Network error. Please check your connection and try again.",
        });
      }
    };

    verifyToken();
  }, [token, type, router]);

  const handleResendToken = async () => {
    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        alert("New verification link sent to your email!");
      } else {
        alert("Failed to resend verification link. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  const getIconForStatus = () => {
    switch (verification.status) {
      case "loading":
        return (
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        );
      case "success":
        return (
          <div className="rounded-full bg-green-100 p-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case "expired":
        return (
          <div className="rounded-full bg-yellow-100 p-4">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="rounded-full bg-red-100 p-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">{getIconForStatus()}</div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {type === "email"
                ? "Email Verification"
                : "Password Reset Verification"}
            </h2>

            <p className="text-gray-600 mb-6">{verification.message}</p>

            {verification.status === "loading" && (
              <div className="text-sm text-gray-500">
                This may take a few moments...
              </div>
            )}

            {verification.status === "success" && (
              <div className="text-sm text-green-600">
                Redirecting you automatically...
              </div>
            )}

            {(verification.status === "error" ||
              verification.status === "expired") && (
              <div className="space-y-4">
                {verification.status === "expired" && (
                  <button
                    onClick={handleResendToken}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send New Verification Link
                  </button>
                )}

                <button
                  onClick={() => router.push("/")}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
