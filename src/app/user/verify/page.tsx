"use client";
import { useState } from "react";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users/user-verify/sent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Verification link sent! Check your email.");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-violet-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10 space-y-4"
      >
        <h1 className="text-2xl text-white font-bold">Email Verification</h1>
        <p className="text-gray-300 text-sm">
          Enter your email to receive a verification link.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400/50"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Verification Link"}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmailPage;
