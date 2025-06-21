"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { VerificationState } from "@/types";

export default function VerifyTokenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verification, setVerification] = useState<VerificationState>({
    status: "loading",
    message: "Verifying your token...",
  });

  const token = searchParams.get("token");
  const type = searchParams.get("type") || "email";

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
        const response = await fetch("/api/users/user-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setVerification({
            status: "success",
            message:
              type === "email"
                ? "Email verified successfully! You can now log in."
                : "Token verified! You can now reset your password.",
          });

          // Auto-redirect after short delay
          setTimeout(() => {
            router.push("/user/login");
          }, 3000);
        } else {
          const data = await response.json();
          setVerification({
            status: data.status === "expired" ? "expired" : "error",
            message: data.error || "Verification failed.",
          });
        }
      } catch (error) {
        setVerification({
          status: "error",
          message: "Network error. Please try again.",
        });
      }
    };

    verifyToken();
  }, [token, type, router]);


  const getIconForStatus = () => {
    const common =
      "w-10 h-10 p-2 rounded-full flex items-center justify-center";
    switch (verification.status) {
      case "loading":
        return (
          <div className="animate-spin h-8 w-8 border-b-2 border-purple-500 rounded-full" />
        );
      case "success":
        return (
          <div className={`${common} bg-green-500/20 text-green-400`}>✅</div>
        );
      case "error":
        return <div className={`${common} bg-red-500/20 text-red-400`}>❌</div>;
      case "expired":
        return (
          <div className={`${common} bg-yellow-500/20 text-yellow-400`}>⚠️</div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Verification Card */}
      <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-xl text-center text-white">
        <div className="flex justify-center mb-6">{getIconForStatus()}</div>

        <h2 className="text-2xl font-semibold mb-3">
          {type === "email"
            ? "Email Verification"
            : "Password Reset Verification"}
        </h2>

        <p className="text-sm text-gray-300 mb-6">{verification.message}</p>

        {verification.status === "loading" && (
          <p className="text-sm text-gray-400">
            This may take a few moments...
          </p>
        )}

        {verification.status === "success" && (
          <p className="text-sm text-green-400">Redirecting you shortly...</p>
        )}

            <button
              onClick={() => router.push("/user/login")}
              className="w-full py-2 px-4 rounded-lg border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all"
            >
              Go to Home
            </button>
          
      </div>
    </div>
  );
}
