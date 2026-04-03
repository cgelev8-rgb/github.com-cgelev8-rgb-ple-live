"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      window.location.href = "/portal";
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#1b265e" }}>
      {/* Left branding panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{ backgroundColor: "#1b265e" }}
      >
        {/* Decorative orange accent */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: "#f9ad31", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{ backgroundColor: "#f9ad31", transform: "translate(-30%, 30%)" }}
        />

        <div className="relative z-10 text-center">
          <Image
            src="/images/ple-logo.png"
            alt="Private Label Express"
            width={240}
            height={80}
            className="mx-auto mb-8 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Partner Portal
          </h1>
          <p className="text-lg mb-8" style={{ color: "#f9ad31" }}>
            Private Label Express Partner Access
          </p>
          <div className="space-y-4 text-left">
            {[
              "Supply Chain & Inventory Visibility",
              "Fulfillment Performance Analytics",
              "Transparent Billing & Invoices",
              "Actionable Alerts & Restocking Insights",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#f9ad31" }}
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login form panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Image
              src="/images/ple-logo.png"
              alt="Private Label Express"
              width={180}
              height={60}
              className="mx-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          <h2 className="text-3xl font-bold mb-2" style={{ color: "#1b265e" }}>
            Partner Sign In
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Access your Partner Portal dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#1b265e" }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourcompany.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-gray-900 text-sm transition-all"
                style={{ "--tw-ring-color": "#1b265e" } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#1b265e" }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-gray-900 text-sm"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-60 shadow-md"
              style={{ backgroundColor: "#f9ad31" }}
            >
              {loading ? "Signing in…" : "Sign In to Portal"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            Need access?{" "}
            <a
              href="mailto:info@privatelabelexpress.com"
              className="font-medium hover:underline"
              style={{ color: "#1b265e" }}
            >
              Contact Private Label Express
            </a>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Private Label Express. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
